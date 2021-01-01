import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {VotingService} from '../../services/voting/voting.service';
import {select, Store} from '@ngrx/store';
import {selectCandidatesNames} from '../../selectors';
import {Observable} from 'rxjs';
import {MatDialog, MatSnackBar} from '@angular/material';
import {FailsafeComponent} from '../failsafe/failsafe.component';
import {environment} from '../../../environments/environment';
import {handleError} from '../../utilities';

/**
 * Component represents the actual voting booth, in which a person
 * nominates a presidential candidatesState
 */
@Component({
  selector: 'app-booth',
  templateUrl: './booth.component.html',
  styleUrls: ['./booth.component.css']
})
export class BoothComponent {
  selected: string;
  isVoting: boolean;
  candidates$: Observable<string[]>;
  errorMap: any;

  constructor(private fb: FormBuilder,
              private snackbar: MatSnackBar,
              private dialog: MatDialog,
              private store: Store,
              private votingService: VotingService
  ) {
    this.selected = null;
    this.isVoting = false;
    this.candidates$ = store.pipe(
      select(selectCandidatesNames)
    );
    this.errorMap = {
      503: 'We are experiencing difficulties',
      401: 'Login before voting'
    };
  }

  /**
   * Submit selected candidate as vote
   */
  handleSubmit() {
    this.isVoting = true;
    const selected = this.selected;
    console.log('Voting for: ' + selected);
    this.votingService.vote(selected)
      .then(() => {
        this.isVoting = false;
        this.snackbar.open('Vote Submitted', null, {
          duration: environment.snackbarDurationMS,
          panelClass: ['success-snackbar']
        });
      })
      .catch(err => {
        this.isVoting = false;
        handleError(this.snackbar, this.errorMap, err.status, () => null);
        this.openFailsafeDialog();
      });
  }

  /**
   * Open failsafe dialog
   */
  openFailsafeDialog() {
    const dialogRef = this.dialog.open(FailsafeComponent, {
      data: {
        candidate: this.selected
      }
    });
  }
}

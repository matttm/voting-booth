import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {VotingService} from '../../services/voting/voting.service';
import {select, Store} from '@ngrx/store';
import {selectCandidatesNames} from '../../selectors';
import {Observable} from 'rxjs';
import {MatDialog, MatSnackBar} from '@angular/material';
import {FailsafeComponent} from "../failsafe/failsafe.component";

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
        this.snackbar.open('Vote Submitted', null, {duration: 5000});
      })
      .catch(err => {
        this.isVoting = false;
        // TODO: factor to an error handler
        let message = '';
        const status = err.status;
        if (status === 503) {
          message = 'We are experiencing difficulties';
        } else if (status === 401) {
          message = 'Login before voting';
        } else {
          message = 'Unhandled Error';
        }
        this.snackbar
          .open(message, null, {duration: 6000})
          .afterDismissed().subscribe();
        this.openFailsafeDialog();
      });
  }

  /**
   * Open failsafe dialog
   */
  openFailsafeDialog() {
    const dialogRef = this.dialog.open(FailsafeComponent);
  }
}

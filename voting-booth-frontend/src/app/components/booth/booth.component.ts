import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {VotingService} from '../../services/voting/voting.service';
import {select, Store} from '@ngrx/store';
import {selectCandidatesNames} from '../../selectors';
import {Observable} from 'rxjs';
import {MatSnackBar} from "@angular/material";

/**
 * Component represents the actual voting booth, in which a person
 * nominates a presidential candidatesState
 */
@Component({
  selector: 'app-booth',
  templateUrl: './booth.component.html',
  styleUrls: ['./booth.component.css']
})
export class BoothComponent implements OnInit {
  hovered: string;
  selected: string;
  isInfoVisible: boolean;
  isVoting: boolean;
  candidates$: Observable<string[]>;
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private snackbar: MatSnackBar,
              private store: Store,
              private votingService: VotingService
  ) {
    this.hovered = null;
    this.selected = null;
    this.isInfoVisible = false;
    this.isVoting = false;
    this.candidates$ = store.pipe(
      select(selectCandidatesNames)
    );
    const groupConfig = {};
    // @ts-ignore
    groupConfig.select = ['', Validators.required];
    this.form = this.fb.group(groupConfig);
  }

  ngOnInit() {
  }

  handleSubmit() {
    this.isVoting = true;
    this.votingService.vote('null')
      .then(() => {
        this.isVoting = false;
        this.snackbar.open('Vote Submitted', null, {duration: 5000});
      })
      .catch(err => {
        // TODO: factor to an error handler
        let message = '';
        const status = err.status;
        if (status === 503) {
          message = 'We are experiencing difficulties';
        } else if (status === 401) {
          message = 'Login before voting';
        }
        this.snackbar
          .open(message, null, {duration: 6000})
          .afterDismissed().subscribe(() => this.form.reset());
      });
  }

  // TODO: remove or find another use?
  onMouseEnter(name: string) {
    this.isInfoVisible = true;
    this.hovered = name;
  }

  // TODO: remove or find another use?
  onMouseLeave() {
    this.isInfoVisible = false;
    this.hovered = null;
  }

}

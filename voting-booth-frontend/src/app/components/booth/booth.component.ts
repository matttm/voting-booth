import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {VotingService} from '../../services/voting/voting.service';
import {select, Store} from '@ngrx/store';
import {selectCandidatesNames} from '../../selectors';
import {Observable} from 'rxjs';

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
  candidates$: Observable<string[]>;
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private store: Store,
              private votingService: VotingService
  ) {
    this.hovered = null;
    this.selected = null;
    this.isInfoVisible = false;
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

  vote() {}

  onMouseEnter(name: string) {
    this.isInfoVisible = true;
    this.hovered = name;
  }

  onMouseLeave() {
    this.isInfoVisible = false;
    this.hovered = null;
  }

}

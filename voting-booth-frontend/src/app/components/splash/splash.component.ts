import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {AppState} from '../../reducers';
import {select, Store} from '@ngrx/store';
import {selectCandidatesNames} from '../../selectors';
import {CandidateInfoComponent} from '../candidate-info/candidate-info.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit {
  candidateNames$: Observable<string[]>;

  constructor(private store: Store<AppState>, private dialog: MatDialog) {
    this.candidateNames$ = store.pipe(select(selectCandidatesNames));
  }

  ngOnInit() {}

  onCandidateClick(name: string) {
    const dialogRef = this.dialog.open(CandidateInfoComponent);
    const comp = dialogRef.componentInstance;
    comp.selectCandidate(name);
  }
}

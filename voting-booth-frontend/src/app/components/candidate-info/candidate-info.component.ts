import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Observable} from 'rxjs';
import {AppState} from '../../reducers';
import {select, Store} from '@ngrx/store';
import {selectCandidate} from '../../selectors';
import {CandidateData} from '../../types';

@Component({
  selector: 'app-candidate-info',
  templateUrl: './candidate-info.component.html',
  styleUrls: ['./candidate-info.component.css']
})
export class CandidateInfoComponent implements OnInit, OnChanges {

  @Input()
  candidateName: string;

  candidate$: Observable<CandidateData>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.candidate$ = this.store.pipe(select(selectCandidate, this.candidateName));
  }
}

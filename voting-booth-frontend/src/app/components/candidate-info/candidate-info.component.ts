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
export class CandidateInfoComponent {

  candidate$: Observable<CandidateData>;

  constructor(private store: Store<AppState>) { }

  /**
   * Get CandidateData of selected candidate
   *
   * @param name the name of selected candidate
   */
  selectCandidate(name: string): void {
    this.candidate$ = this.store.pipe(select(selectCandidate, name));
  }
}

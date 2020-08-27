import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {first} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {LoadCandidateAction} from '../../actions/candidate.actions';

@Injectable()
export class CandidacyService {

  constructor(
    private store: Store<AppState>,
    private httpClient: HttpClient
  ) {
    this.httpClient.get<CandidateData[]>('assets/candidates.json').pipe(first())
      .subscribe((data: CandidateData[]) => {
        console.log(data);
        this.store.dispatch(new LoadCandidateAction({candidateData: data }));
      });
  }

  configureApp(httpClient: HttpClient, store: Store) {
    return httpClient.get<CandidateData[]>('assets/candidates.json').pipe(first())
      .toPromise()
      .then((data: CandidateData[]) => {
        console.log(data);
        store.dispatch(new LoadCandidateAction({candidateData: data }));
      });
  }
}

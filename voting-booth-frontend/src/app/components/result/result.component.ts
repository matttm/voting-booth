import {Component, OnDestroy, OnInit} from '@angular/core';
import {ResultsResponse, Result} from '../../types';
import {interval, Observable, Subject, throwError} from 'rxjs';
import {VotingService} from '../../services/voting/voting.service';
import {switchMap, takeUntil, tap, map, catchError} from 'rxjs/operators';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit, OnDestroy {

  constructor(private votingService: VotingService) {
    this.columns = ['name', 'votes'];
  }
  results$: Observable<Result[]>;
  unsub$: Subject<any>;
  columns: string[];

  static translateResultsFromWire(body: ResultsResponse): Result[] {
    const resultsMap = new Map(body.results);
    const ret: Result[] = [];
    for (const [k, v] of Array.from(resultsMap)) {
      ret.push({
        name: k as string,
        votes: v as number
      });
    }
    return ret;
  }

  ngOnInit() {
    this.results$ = interval(5000)
      .pipe(
        takeUntil(this.unsub$),
        tap(() => console.log('Getting results')),
        switchMap(() => this.votingService.getResults()
          .pipe(
            catchError((err) => {
              // TODO: make an alert service? for snackbar?
              const status = err.status;
              let message = '';
              if (status === 503) {
                message = 'We are experiencing difficulties';
              } else if (status === 401) {
                message = 'Login before voting';
              }
              return throwError(message);
            }),
            map<ResultsResponse, Result[]>(ResultComponent.translateResultsFromWire)
          )
        )
      );
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }

}

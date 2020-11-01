import {Component, OnDestroy, OnInit} from '@angular/core';
import {ResultsResponse, Result, ResultsMessage} from '../../types';
import {interval, Observable, Subject, throwError} from 'rxjs';
import {VotingService} from '../../services/voting/voting.service';
import {switchMap, takeUntil, tap, map, catchError} from 'rxjs/operators';

/**
 * Component responsible for showing a table with election results
 */
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit, OnDestroy {

  constructor(private votingService: VotingService) {
    this.unsub$ = new Subject();
    this.columns = ['name', 'votes'];
  }
  results$: Observable<Result[]>;
  unsub$: Subject<any>;
  columns: string[];

  /**
   * Reformat results data from wire, uch that it is formatted
   * for the table
   *
   * @param body unformatted results
   * @return formatted data
   */
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

  /**
   * Initialization, including subscribing to results
   */
  ngOnInit() {
    this.results$ = interval(5000)
      .pipe(
        takeUntil(this.unsub$),
        switchMap(() => this.votingService.getResults()
          .pipe(
            tap(res => console.log(`Response: ${JSON.stringify(res)}`)),
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
            map<ResultsMessage, Result[]>(ResultComponent.translateResultsFromWire),
            tap(res => console.log(`Response: ${JSON.stringify(res)}`))
          )
        )
      );
    this.results$.subscribe(() => console.log('got an emission'));
  }

  /**
   * Unsubscribe from all subs and cleanup
   */
  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }

}

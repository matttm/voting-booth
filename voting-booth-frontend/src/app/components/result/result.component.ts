import {Component, OnDestroy, OnInit} from '@angular/core';
import {ResultsResponse, ResultsMessage, Result} from '../../types';
import {interval, Observable, Subject} from 'rxjs';
import {VotingService} from '../../services/voting/voting.service';
import {switchMap, takeUntil, tap, map} from 'rxjs/operators';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit, OnDestroy {
  results$: Observable<Result[]>;
  unsub$: Subject<any>;
  columns: string[];

  constructor(private votingService: VotingService) {
    this.columns = ['name', 'votes'];
  }

  ngOnInit() {
    this.results$ = interval(5000)
      .pipe(
        takeUntil(this.unsub$),
        tap(() => console.log('Getting results')),
        switchMap(() => this.votingService.getResults()),
        map<ResultsResponse, Result[]>(body => {
          const resultsMap = new Map(body.results);
          const ret = {};
          for (let candidate in resultsMap) {
            ret['candidate'] = 
          }
        })
      );
    // this.results$.subscribe(
    //   body => {
    //     // @ts-ignore
    //     const results = new Map(body.results);
    //     return;
    //   },
    //   err => {
    //     return;
    //   });
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }

}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {shareReplay, tap} from "rxjs/operators";
import {log} from "util";

/**
 * Service is in charge of voting, which includes tallying votes
 * and sending in nominations
 */
@Injectable({
  providedIn: 'root'
})
export class VotingService {

  constructor(private httpClient: HttpClient) {}

  /**
   * Vote for a candidate
   *
   * @param nomination a string of the person who is being voted for
   */
  vote(nomination: string) {
    this.httpClient.post('/vote', null);
  }

  /**
   * Determines whether a person has voted
   */
  hasVoted() {
    return true;
  }

  getReaults(): Observable<any> {
    return this.httpClient.get('/results')
      .pipe(
        tap(console.log),
        shareReplay()
      );
  }
}

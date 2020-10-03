import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {shareReplay, tap} from 'rxjs/operators';

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
  vote(nomination: string): Promise<any> {
    const vote = { vote: nomination };
    return this.httpClient.post('/votes', vote)
      .pipe(
        shareReplay()
      ).toPromise();
    // return new Promise( resolve => setTimeout(resolve, 5000));
  }

  /**
   * Determine if a voter has voted or not
   *
   * @return a promise of the answer
   */
  hasVoted(): Promise<any> {
    return this.httpClient.get('/api/user?voted=true')
      .pipe(
        tap(console.log),
        shareReplay()
      ).toPromise();
  }

  /**
   * Get current standing's results of current election
   *
   * @return a promise of the results
   */
  getResults(): Promise<any> {
    return this.httpClient.get('/results')
      .pipe(
        tap(console.log),
        shareReplay()
      ).toPromise();
  }
}

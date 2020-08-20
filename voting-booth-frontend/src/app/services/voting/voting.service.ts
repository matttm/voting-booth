import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

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
  }
}

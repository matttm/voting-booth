import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {first} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CandidacyService {
  candidates: Candidate[];

  constructor(private httpClient: HttpClient) {
    this.httpClient.get<Candidate[]>('assets/candidates.json').pipe(first())
      .subscribe((data: any[]) => {
        console.log(data);
        this.candidates = data;
      });
  }

  getCandidatesNames() {
    return this.candidates.map(candidate => candidate.name);
  }
  getCandidate(name: string) {}
}

import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidacyService implements OnInit{
  candidates: any;

  constructor(private htrpClienft: HttpClient) { }

  ngOnInit() {
    this.htrpClienft.get('assets/candidates.json')
      .subscribe(() => {
        // TODO: do something with this data
      });
  }

  getCandidatesNames() {}
  getCandidate(name: string) {}
}

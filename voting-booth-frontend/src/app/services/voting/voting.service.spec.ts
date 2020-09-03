import {async, TestBed} from '@angular/core/testing';

import { VotingService } from './voting.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('VotingService', () => {
  let service: VotingService;
  let http: HttpTestingController;

  beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [VotingService]
      }).compileComponents();
      service = TestBed.get(VotingService);
      http = TestBed.get(HttpTestingController);
    }
  ));

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request on a vote', () => {
    service.vote('Sally Dodo');
    const request = http.expectOne( `/vote`);
    expect(request.request.method).toBe('POST');
  });

  it('should send a POST request with a "ssn" key on body when' +
    ' querying if someone voted', () => {
    service.hasVoted('198-19-1902');
    const request = http.expectOne( `/voted`);
    expect(request.request.method).toBe('POST');
    expect(request.request.body.ssn).toBeDefined();
  });

  it('should send a GET request on results', () => {
    service.getResults();
    const request = http.expectOne( `/results`);
    expect(request.request.method).toBe('GET');
  });
});

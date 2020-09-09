import { TestBed } from '@angular/core/testing';

import { CandidacyService } from './candidacy.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {provideMockStore} from '@ngrx/store/testing';

describe('CanidacyService', () => {
  let service: CandidacyService;
  let http: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule
        ],
        providers: [
          CandidacyService,
          provideMockStore()
        ]
    });
    service = TestBed.get(CandidacyService);
    http = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send GET request for candidates', () => {
    // this is called at construction  time of service
    const request = http.expectOne('assets/candidates.json');
    expect(request.request.method).toBe('GET');
  });
});

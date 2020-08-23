import { TestBed } from '@angular/core/testing';

import { CandidacyService } from './candidacy.service';

describe('CanidacyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CandidacyService = TestBed.get(CandidacyService);
    expect(service).toBeTruthy();
  });
});

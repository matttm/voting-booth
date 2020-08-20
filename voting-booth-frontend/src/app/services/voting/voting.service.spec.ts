import { TestBed } from '@angular/core/testing';

import { VotingService } from './voting.service';

describe('VotingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VotingService = TestBed.get(VotingService);
    expect(service).toBeTruthy();
  });
});

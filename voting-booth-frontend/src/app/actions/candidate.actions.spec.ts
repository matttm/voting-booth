import * as fromCandidate from './candidate.actions';

describe('loadCandidates', () => {
  it('should return an actions', () => {
    expect(fromCandidate.loadCandidates().type).toBe('[Candidate] Load Candidates');
  });
});

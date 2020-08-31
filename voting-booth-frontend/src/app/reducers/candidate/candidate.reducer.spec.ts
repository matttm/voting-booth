import * as fromCandidate from './candidate.reducer';
import * as fromAction from '../../actions/candidate/candidate.actions';

describe('CandidateReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialCandidatesState } = fromCandidate;
      const action = new fromAction.CandidateAction();
      const state = fromCandidate.candidateReducer(undefined, action);

      expect(state).toBe(initialCandidatesState);
    });
  });
});

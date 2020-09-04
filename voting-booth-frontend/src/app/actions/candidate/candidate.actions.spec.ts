import * as fromCandidate from './candidate.actions';
import {CandidateData} from '../../types';

describe('loadCandidates', () => {
  it('should return an actions', () => {
    const payload = [];
    const action = new fromCandidate.LoadCandidateAction({ candidateData: payload});
    expect(action.type).toBe('[Candidate] Load Candidates');
  });
});

describe('addCandidate', () => {
  it('should return an actions', () => {
    const payload: CandidateData = {
      image: 'http:fakeurl.com',
      name: 'Missie MaGoo',
      party: 'Lib',
      runningMate: 'Johnny Jock',
      stances: []
    };
    const action = new fromCandidate.AddCandidateAction({ candidateData: payload});
    expect(action.type).toBe('[Candidate] Add Candidate');
  });
});

describe('removeCandidate', () => {
  it('should return an actions', () => {
    const payload = 'Jolly Molly';
    const action = new fromCandidate.RemoveCandidateAction({ name: payload});
    expect(action.type).toBe('[Candidate] Remove Candidate');
  });
});

describe('candidatesError', () => {
  it('should return an actions', () => {
    const payload = 'esta error';
    const action = new fromCandidate.CandidateError({ error: payload});
    expect(action.type).toBe('[Candidate] Load Candidates Failed');
  });
});

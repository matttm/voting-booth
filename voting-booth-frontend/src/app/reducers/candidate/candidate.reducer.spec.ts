import * as fromCandidate from './candidate.reducer';
import * as fromAction from '../../actions/candidate/candidate.actions';
import {CandidateData} from '../../types';
import {CandidateAction} from '../../actions/candidate/candidate.actions';

describe('CandidateReducer', () => {
  it('should return the default state', () => {
    const { initialCandidatesState } = fromCandidate;
    const action = new fromAction.CandidateAction();
    const state = fromCandidate.candidateReducer(undefined, action);

    expect(state).toBe(initialCandidatesState);
  });

  it('should add a candidate', () => {
    const name = 'Shelly Woo';
    const payload = {
      candidateData: {
        name
      } as CandidateData
    };
    const action = new fromAction.AddCandidateAction(payload);
    const state = fromCandidate.candidateReducer(undefined, action as CandidateAction);
    const candidates = state.candidates;

    expect(candidates.length).toBe(1);
    expect(candidates[0].name).toBe(name);
  });

  it('should add two candidates', () => {
    const name1 = 'Shelly Woo';
    const name2 = 'Kelly Kinop';
    let payload = {
      candidateData: {
        name: name1,
      } as CandidateData
    };
    let action = new fromAction.AddCandidateAction(payload);
    let state = fromCandidate.candidateReducer(undefined, action as CandidateAction);
    payload = {
      candidateData: {
        ...payload.candidateData[0],
        name: name2
      } as CandidateData
    };
    action = new fromAction.AddCandidateAction(payload);
    state = fromCandidate.candidateReducer(state, action as CandidateAction);
    const candidates = state.candidates;

    expect(candidates.length).toBe(2);
    expect(candidates[0].name).toBe(name1);
    expect(candidates[1].name).toBe(name2);
  });

  it('should load candidates', () => {
    const name1 = 'Shelly Woo';
    const name2 = 'Kelly Kinop';
    const payload = {
      candidateData: [
        {
          name: name1
        } as CandidateData,
        {
          name: name2
        } as CandidateData
      ]
    };
    const action = new fromAction.LoadCandidateAction(payload);
    const state = fromCandidate.candidateReducer(undefined, action as CandidateAction);
    const candidates = state.candidates;

    expect(candidates.length).toBe(2);
    expect(candidates[0].name).toBe(name1);
    expect(candidates[1].name).toBe(name2);
  });

  it('should remove a candidate', () => {
    const name1 = 'Shelly Woo';
    const name2 = 'Kelly Kinop';
    const payload = {
      candidateData: [
        {
          name: name1
        } as CandidateData,
        {
          name: name2
        } as CandidateData
      ]
    };
    const action = new fromAction.LoadCandidateAction(payload);
    const state1 = fromCandidate.candidateReducer(undefined, action as CandidateAction);
    const remove = { name: name1 };
    const removeAction = new fromAction.RemoveCandidateAction(remove);
    const state2 = fromCandidate.candidateReducer(state1, removeAction as CandidateAction);
    const candidates = state2.candidates;

    expect(candidates.length).toBe(1);
    expect(candidates[0].name).toBe(name2);
  });
});

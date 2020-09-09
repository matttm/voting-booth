import {createSelector} from '@ngrx/store';
import {AppState} from '../reducers';
import {CandidateData} from '../types';
import {CandidatesState} from '../reducers/candidate/candidate.reducer';

export const selectCandidatesState = (state: AppState) => state.candidatesState;

export const selectCandidates = createSelector(
  selectCandidatesState,
  (state: CandidatesState) => state.candidates
);

export const selectCandidate = createSelector(
  selectCandidates,
  (state: CandidateData[], name: string) => state.find(c => c.name === name)
);

export const selectCandidatesNames = createSelector(
  selectCandidates,
  (candidates: CandidateData[]) => candidates.map(c => c.name)
);

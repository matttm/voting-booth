import {createSelector} from '@ngrx/store';
import {AppState, CandidatesState} from '../reducers';

export const selectCandidatesState = (state: AppState) => state.candidatesState;

export const selectCandidates = createSelector(
  selectCandidatesState,
  (state: CandidatesState) => state.candidates
);

export const selectCandidatesNames = createSelector(
  selectCandidates,
  (candidates: CandidateData[]) => candidates.map(c => c.name)
);

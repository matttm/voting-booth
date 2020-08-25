import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import {CandidateAction, CandidateActionTypes} from '../actions/candidate.actions';

export interface AppState {
  candidate: CandidateState;
}

export interface CandidateState {
  candidateData: CandidateData | null;
}

const initialCandidateState: CandidateState = {
  candidateData: null
};

export function candidateReducer(
  state: CandidateState = initialCandidateState,
  action: CandidateAction
): CandidateState {
  switch (action.type) {
    case CandidateActionTypes.loadCandidates:
    case CandidateActionTypes.candidatesError:
    default:
      return state;
  }
}

export const reducers: ActionReducerMap<AppState> = {
  candidate: candidateReducer
};

export const selectCandidateState = (state: AppState) => state.candidate;

export const metaReducers: MetaReducer<CandidateState>[] = !environment.production ? [] : [];

import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';
import {candidateReducer, CandidatesState} from './candidate/candidate.reducer';

export interface AppState {
  candidatesState: CandidatesState;
}

export const reducers: ActionReducerMap<AppState> = {
  candidatesState: candidateReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

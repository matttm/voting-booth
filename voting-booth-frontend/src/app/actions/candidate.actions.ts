import { createAction, props } from '@ngrx/store';
import {Action} from '@ngrx/store';

export enum CandidateActionTypes {
  loadCandidates = '[Home Page] Load Candidates',
  candidatesError = '[Home Page] Load Candidates Failed'
}

export class CandidateAction implements Action {
  type: string;
  payload: {
    candidateData: CandidateData,
    error: string
  };
}

export class LoadCandidateAction implements Action {
  readonly type = CandidateActionTypes.loadCandidates;

  constructor(readonly payload: {candidateData: CandidateData} ) {}
}

export class CandidateError implements Action {
  readonly type = CandidateActionTypes.candidatesError;

  constructor(readonly payload: {error: string} ) {}
}

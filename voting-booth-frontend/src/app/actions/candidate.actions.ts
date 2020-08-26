import { createAction, props } from '@ngrx/store';
import {Action} from '@ngrx/store';

export enum CandidateActionTypes {
  loadCandidates = '[Home Page] Load Candidates',
  addCandidate = '[Home Page] Add Candidate',
  removeCandidate = '[Home Page] Remove Candidate',
  candidatesError = '[Home Page] Load Candidates Failed'
}

export class CandidateAction implements Action {
  type: string;
  payload: {
    candidateData: CandidateData[] | CandidateData,
    name: string,
    error: string
  };
}

export class LoadCandidateAction implements Action {
  readonly type = CandidateActionTypes.loadCandidates;

  constructor(readonly payload: { candidateData: CandidateData[] }) {}
}

export class AddCandidateAction implements Action {
  readonly type = CandidateActionTypes.addCandidate;

  constructor(readonly payload: {candidateData: CandidateData} ) {}
}

export class RemoveCandidateAction implements Action {
  readonly type = CandidateActionTypes.removeCandidate;

  constructor(readonly payload: {name: string} ) {}
}

export class CandidateError implements Action {
  readonly type = CandidateActionTypes.candidatesError;

  constructor(readonly payload: {error: string} ) {}
}

import {Action} from '@ngrx/store';
import {CandidateData} from '../../types';

export enum CandidateActionTypes {
  loadCandidates  = '[Candidate] Load Candidates',
  addCandidate    = '[Candidate] Add Candidate',
  removeCandidate = '[Candidate] Remove Candidate',
  candidatesError = '[Candidate] Load Candidates Failed'
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

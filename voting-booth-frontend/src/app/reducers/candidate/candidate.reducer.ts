import {CandidateData} from '../../types';
import {CandidateAction, CandidateActionTypes} from '../../actions/candidate/candidate.actions';

export interface CandidatesState {
  candidates: CandidateData[];
}

export const initialCandidatesState: CandidatesState = {
  candidates: []
};

export function candidateReducer(
  state: CandidatesState = initialCandidatesState,
  action: CandidateAction
): CandidatesState {
  let newState: CandidatesState;
  switch (action.type) {
    case CandidateActionTypes.loadCandidates:
      newState = {
        ...state,
        candidates: [...state.candidates.concat(action.payload.candidateData)]
      };
      break;

    case CandidateActionTypes.addCandidate:
      newState = {
        candidates: [...state.candidates]
      };
      newState.candidates.push(action.payload.candidateData as CandidateData);
      break;

    case CandidateActionTypes.removeCandidate:
      newState = {
        candidates: [...state.candidates]
      };
      newState.candidates = newState.candidates
        .filter(c => c.name !== action.payload.name);
      break;

    case CandidateActionTypes.candidatesError:
    default:
      return state;
  }
  return newState;
}

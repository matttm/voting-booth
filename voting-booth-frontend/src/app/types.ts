export interface FormObject {
  placeholder: string;
  name: string;
  displayName: string;
}

/**
 * Data for Store Objects
 */
export interface CandidateData {
  name: string;
  image: string;
  runningMate: string;
  party: string;
  stances: string[];
}

export interface JsonWebToken {
  idToken: string;
  expiresIn: number;
}

export interface Result {
  name: string;
  votes: number;
}

export interface SimpleResponse {
  success: boolean;
  message: string;
}

export interface ResultsResponse {
  success: boolean;
  results: string[];
}

// TODO: find a way to make this generic
export type JwtMessage = JsonWebToken | SimpleResponse;
export type ResultsMessage = ResultsResponse | SimpleResponse;

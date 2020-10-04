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

export interface SimpleMessage {
  success: boolean;
  message: string;
}

export interface Results {
  [key: string]: number;
}

// TODO: find a way to make this generic
export type JwtMessage = JsonWebToken | SimpleMessage;
export type ResultsMessage = Results | SimpleMessage;

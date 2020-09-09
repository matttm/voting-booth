
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
  tokenId: string;
  expiresIn: number;
}

export interface Results {
  [key: string]: number;
}

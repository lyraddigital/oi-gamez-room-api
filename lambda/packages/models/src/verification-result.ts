export interface VerificationResult {
  isSuccessful: boolean;
  errorMessages: string[];
}

export interface VerificationResultWithData<T> extends VerificationResult {
  data?: T;
}

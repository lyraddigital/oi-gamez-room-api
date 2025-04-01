import { RuleSetResult } from "../rule-sets";
import { ValidationResult } from "../validators";

export type VerificationResult = ValidationResult | RuleSetResult;

export type VerificationResultWithData<T> = VerificationResult & {
  data?: T;
};

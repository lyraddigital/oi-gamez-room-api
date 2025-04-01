import { CORS_ALLOWED_ORIGINS } from "/opt/nodejs/oigamez-core";
import { VerificationResult } from "../models";

export const validateOrigin = (origin?: string): VerificationResult => {
  if (
    !origin ||
    !CORS_ALLOWED_ORIGINS.toLowerCase().includes(origin.toLowerCase())
  ) {
    return {
      isSuccessful: false,
      errorMessages: ["Not allowed to access resource. CORS ERROR"],
    };
  }

  return { isSuccessful: true, errorMessages: [] };
};

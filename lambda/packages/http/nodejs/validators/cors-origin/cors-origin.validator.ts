import { CORS_ALLOWED_ORIGINS } from "/opt/nodejs/oigamez-core";
import { ValidationResult } from "../models";

export const validateOrigin = (origin?: string): ValidationResult => {
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

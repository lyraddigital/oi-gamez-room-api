import { ValidationResult } from "../models";

export const validateOrigin = (
  corsAllowedOrigins: string,
  origin?: string
): ValidationResult => {
  if (
    !origin ||
    !corsAllowedOrigins.toLowerCase().includes(origin.toLowerCase())
  ) {
    return {
      isSuccessful: false,
      errorMessages: ["Not allowed to access resource. CORS ERROR"],
    };
  }

  return { isSuccessful: true, errorMessages: [] };
};

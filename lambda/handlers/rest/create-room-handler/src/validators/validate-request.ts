import {
  ValidationResult,
  validateOrigin,
  validateUsername,
} from "@oigamez/validators";

export const validateRequest = (
  origin?: string,
  username?: string
): ValidationResult => {
  const originValidationResult = validateOrigin(origin);

  if (!originValidationResult.isSuccessful) {
    return originValidationResult;
  }

  const usernameValidationResult = validateUsername(username);

  if (!usernameValidationResult.isSuccessful) {
    return {
      isSuccessful: false,
      errorMessages: usernameValidationResult.errorMessages,
    };
  }

  return { isSuccessful: true, errorMessages: [] };
};

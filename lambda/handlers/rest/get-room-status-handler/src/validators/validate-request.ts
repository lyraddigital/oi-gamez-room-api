import { CORS_ALLOWED_ORIGINS } from "/opt/nodejs/oigamez-core";
import {
  validateOrigin,
  validateRoomCode,
  ValidationResult,
} from "/opt/nodejs/oigamez-http";

export const validateRequest = (
  origin?: string,
  roomCode?: string
): ValidationResult => {
  const originValidationResult = validateOrigin(CORS_ALLOWED_ORIGINS, origin);

  if (!originValidationResult.isSuccessful) {
    return originValidationResult;
  }

  return validateRoomCode(roomCode);
};

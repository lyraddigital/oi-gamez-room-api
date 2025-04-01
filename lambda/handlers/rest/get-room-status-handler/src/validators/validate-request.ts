import {
  validateOrigin,
  validateRoomCode,
  ValidationResult,
} from "/opt/nodejs/oigamez-http";

export const validateRequest = (
  origin?: string,
  roomCode?: string
): ValidationResult => {
  const originValidationResult = validateOrigin(origin);

  if (!originValidationResult.isSuccessful) {
    return originValidationResult;
  }

  return validateRoomCode(roomCode);
};

import {
  validateOrigin,
  validateRoomCode,
  VerificationResult,
} from "/opt/nodejs/oigamez-http";

export const validateRequest = (
  origin?: string,
  roomCode?: string
): VerificationResult => {
  const originValidationResult = validateOrigin(origin);

  if (!originValidationResult.isSuccessful) {
    return originValidationResult;
  }

  return validateRoomCode(roomCode);
};

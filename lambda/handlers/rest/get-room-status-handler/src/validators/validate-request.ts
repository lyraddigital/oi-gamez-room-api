import { VerificationResult } from "@oigamez/models";
import { validateOrigin, validateRoomCode } from "@oigamez/validators";

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

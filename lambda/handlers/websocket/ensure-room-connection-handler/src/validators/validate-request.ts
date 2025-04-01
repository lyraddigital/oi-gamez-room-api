import {
  validateRoomCode,
  validateUsername,
  VerificationResult,
} from "/opt/nodejs/oigamez-http";

export const validateRequest = (
  username?: string,
  roomCode?: string
): VerificationResult => {
  const errorMessages: string[] = [];
  const usernameValidationResult = validateUsername(username);
  const roomCodeValidationResult = validateRoomCode(roomCode);

  if (!usernameValidationResult.isSuccessful) {
    errorMessages.push(...usernameValidationResult.errorMessages);
  }

  if (!roomCodeValidationResult.isSuccessful) {
    errorMessages.push(...roomCodeValidationResult.errorMessages);
  }

  if (errorMessages.length > 0) {
    return {
      isSuccessful: false,
      errorMessages,
    };
  }

  return { isSuccessful: true, errorMessages: [] };
};

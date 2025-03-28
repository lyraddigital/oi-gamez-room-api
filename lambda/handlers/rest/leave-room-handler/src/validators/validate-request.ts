import { VerificationResult } from "@oigamez/models";
import {
  validateOrigin,
  validateRoomCode,
  validateUsername,
} from "@oigamez/validators";

import { LeaveRoomPayload } from "../models";

export const validateRequest = (
  origin?: string,
  roomCode?: string,
  payload?: LeaveRoomPayload
): VerificationResult => {
  const originValidationResult = validateOrigin(origin);

  if (!originValidationResult.isSuccessful) {
    return originValidationResult;
  }

  if (!payload) {
    return {
      isSuccessful: false,
      errorMessages: ["Missing payload from request"],
    };
  }

  const errorMessages: string[] = [];
  const usernameValidationResult = validateUsername(payload!.username);
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

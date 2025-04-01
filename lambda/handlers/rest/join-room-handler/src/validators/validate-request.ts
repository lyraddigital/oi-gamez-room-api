import { VerificationResult } from "/opt/nodejs/oigamez-core";
import {
  validateOrigin,
  validateRoomCode,
  validateUsername,
} from "/opt/nodejs/oigamez-http";

import { JoinRoomPayload } from "../models";

export const validateRequest = (
  origin?: string,
  roomCode?: string,
  payload?: JoinRoomPayload
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

import { CORS_ALLOWED_ORIGINS } from "/opt/nodejs/oigamez-core.js";
import {
  validateOrigin,
  validateRoomCode,
  validateUsername,
  ValidationResult,
} from "/opt/nodejs/oigamez-http.js";

import { LeaveRoomPayload } from "../models/index.js";

export const validateRequest = (
  origin?: string,
  roomCode?: string,
  payload?: LeaveRoomPayload
): ValidationResult => {
  const originValidationResult = validateOrigin(CORS_ALLOWED_ORIGINS, origin);

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

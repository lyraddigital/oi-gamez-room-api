import { CORS_ALLOWED_ORIGINS } from "@oigamez/core";
import {
  validateOrigin,
  validateUsername,
  ValidationResult,
} from "@oigamez/http";

import { CreateRoomPayload } from "../models";
import { validateGameTypeId } from "./game-type-id.validator";
import { validateRoomTitle } from "./room-title.validator";
import { validateRoomVisibility } from "./room-visibility.validator";

export const validateRequest = (
  origin?: string,
  payload?: CreateRoomPayload
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
  const gameTypeIdValidationResult = validateGameTypeId(payload!.gameTypeId);
  const usernameValidationResult = validateUsername(payload!.hostUsername);
  const titleValidationResult = validateRoomTitle(payload!.title);
  const isPublicValidationResult = validateRoomVisibility(payload!.isPublic);

  if (!gameTypeIdValidationResult.isSuccessful) {
    errorMessages.push(...gameTypeIdValidationResult.errorMessages);
  }

  if (!usernameValidationResult.isSuccessful) {
    errorMessages.push(...usernameValidationResult.errorMessages);
  }

  if (!titleValidationResult.isSuccessful) {
    errorMessages.push(...titleValidationResult.errorMessages);
  }

  if (!isPublicValidationResult.isSuccessful) {
    errorMessages.push(...isPublicValidationResult.errorMessages);
  }

  if (errorMessages.length > 0) {
    return {
      isSuccessful: false,
      errorMessages,
    };
  }

  return { isSuccessful: true, errorMessages: [] };
};

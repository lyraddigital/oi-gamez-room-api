import { ValidationResult } from "../models";

export const validateRoomCode = (roomCode?: string): ValidationResult => {
  if (!roomCode) {
    return {
      isSuccessful: false,
      errorMessages: ["Room code is required"],
    };
  }

  const errorMessages: string[] = [];

  if (!roomCode.match(/^[A-Z]{4}$/g)) {
    errorMessages.push("Room code must be 4 uppercase letters");
  }

  if (errorMessages.length > 0) {
    return {
      isSuccessful: false,
      errorMessages,
    };
  }

  return { isSuccessful: true, errorMessages: [] };
};

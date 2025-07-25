import { ValidationResult } from "@oigamez/http";

export const validateRoomTitle = (roomTitle?: string): ValidationResult => {
  if (!roomTitle) {
    return {
      isSuccessful: false,
      errorMessages: ["Room title is required"],
    };
  }

  if (roomTitle.length < 5 || roomTitle.length > 50) {
    return {
      isSuccessful: false,
      errorMessages: ["Room title must be between 5 and 50 characters"],
    };
  }

  return {
    isSuccessful: true,
    errorMessages: [],
  };
};

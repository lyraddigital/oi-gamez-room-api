import { ValidationResult } from "/opt/nodejs/oigamez-http";

export const validateRoomVisibility = (
  isPublic?: boolean
): ValidationResult => {
  if (isPublic === undefined) {
    return {
      isSuccessful: false,
      errorMessages: ["You need to specify if the room is public or not"],
    };
  }

  return {
    isSuccessful: true,
    errorMessages: [],
  };
};

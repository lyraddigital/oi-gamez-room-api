import { VerificationResult } from "@oigamez/models";

export const validateRoomVisibility = (
  isPublic?: boolean
): VerificationResult => {
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

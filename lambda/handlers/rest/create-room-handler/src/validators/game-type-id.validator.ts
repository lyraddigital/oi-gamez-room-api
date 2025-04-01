import { VerificationResult } from "/opt/nodejs/oigamez-core";

export const validateGameTypeId = (gameTypeId?: number): VerificationResult => {
  if (!gameTypeId) {
    return {
      isSuccessful: false,
      errorMessages: ["Missing game type id."],
    };
  }

  if (isNaN(gameTypeId) || gameTypeId <= 0) {
    return {
      isSuccessful: false,
      errorMessages: ["Game type id must be a number and above 0"],
    };
  }

  return {
    isSuccessful: true,
    errorMessages: [],
  };
};

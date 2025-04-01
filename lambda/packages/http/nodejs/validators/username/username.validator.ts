import { VerificationResult } from "../models";

export const validateUsername = (username?: string): VerificationResult => {
  if (!username) {
    return {
      isSuccessful: false,
      errorMessages: ["Username is required"],
    };
  }

  const errorMessages: string[] = [];

  if (username.length < 2) {
    errorMessages.push("Username must be at least 2 characters");
  }

  if (username.length > 12) {
    errorMessages.push("Username must be no more than 12 characters");
  }

  if (errorMessages.length > 0) {
    return {
      isSuccessful: false,
      errorMessages,
    };
  }

  return { isSuccessful: true, errorMessages: [] };
};

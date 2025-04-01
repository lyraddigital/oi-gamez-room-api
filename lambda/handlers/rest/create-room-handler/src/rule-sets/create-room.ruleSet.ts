import { GameType, VerificationResult } from "/opt/nodejs/oigamez-core";

export const runCreateRoomRuleSet = (
  gameType: GameType | undefined,
  isAlreadyHosting: boolean
): VerificationResult => {
  const errorMessages: string[] = [];

  if (!gameType) {
    errorMessages.push("Incorrect game type set for room");
  }

  if (isAlreadyHosting) {
    errorMessages.push("You are already hosting a room");
  }

  if (errorMessages.length > 0) {
    return {
      isSuccessful: false,
      errorMessages,
    };
  }

  return {
    isSuccessful: true,
    errorMessages: [],
  };
};

import { Room, User } from "@oigamez/models";
import { RuleSetResult } from "@oigamez/rule-sets";

export const runJoinRoomRuleSet = (
  room: Room | undefined,
  users: User[]
): RuleSetResult => {
  const errorMessages: string[] = [];

  if (!room) {
    errorMessages.push("Room could not be found to join");
  }

  // if (isAlreadyHosting) {
  //   errorMessages.push("You are already hosting a room");
  // }

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

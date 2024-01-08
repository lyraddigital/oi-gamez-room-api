import { Room, User } from "@oigamez/models";
import { RuleSetResult } from "@oigamez/rule-sets";

export const runEnsureRoomConnectionRuleSet = (
  room?: Room,
  users?: User[]
): RuleSetResult => {
  return {
    isSuccessful: true,
    errorMessages: [],
  };
};

import { Room, RoomStatus, User } from "@oigamez/models";
import { RuleSetResult } from "@oigamez/rule-sets";

export const runEnsureRoomConnectionRuleSet = (
  isUserHost: boolean,
  room?: Room,
  users?: User[]
): RuleSetResult => {
  if (!room || !users) {
    return {
      isSuccessful: false,
      errorMessages: [
        "Could not find room to ensure connection. Check your room code and/or host username and try again.",
      ],
    };
  }

  if (!isUserHost && room.status === RoomStatus.NotAvailable) {
    return {
      isSuccessful: false,
      errorMessages: [
        "Could not find room to ensure connection. Check your room code.",
      ],
    };
  }

  return {
    isSuccessful: true,
    errorMessages: [],
  };
};

import { Room, RoomStatus, User } from "@oigamez/models";
import { RuleSetResult } from "@oigamez/rule-sets";

export const runEnsureRoomConnectionRuleSet = (
  username: string,
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

  const isUserHost = room.hostUsername.toLowerCase() == username.toLowerCase();

  if (!isUserHost && room.status === RoomStatus.Available) {
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

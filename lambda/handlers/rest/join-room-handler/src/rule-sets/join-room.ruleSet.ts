import { Room, RoomStatus, User } from "@oigamez/models";
import { RuleSetResult } from "@oigamez/rule-sets";

export const runJoinRoomRuleSet = (
  username: string,
  room: Room | undefined,
  users: User[]
): RuleSetResult => {
  const errorMessages: string[] = [];

  if (!room) {
    errorMessages.push("Cannot join room. The room could not be found.");
  } else if (room!.status != RoomStatus.Available) {
    errorMessages.push("Cannot join room. The room is not available.");
  } else if (room!.curNumOfUsers === room!.maxNumOfUsers) {
    errorMessages.push("Cannot join room. The room is full.");
  } else {
    const existingUser = users.find((u) => u.username === username);

    if (existingUser) {
      errorMessages.push("Cannot join room. The user is already in the room");
    }
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

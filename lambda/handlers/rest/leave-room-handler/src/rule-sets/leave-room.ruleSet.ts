import { Room, RoomStatus, User } from "@oigamez/models";
import { RuleSetResult } from "@oigamez/rule-sets";

export const runLeaveRoomRuleSet = (
  username: string,
  room: Room | undefined,
  users: User[]
): RuleSetResult => {
  const errorMessages: string[] = [];

  if (!room) {
    errorMessages.push("Cannot leave room. The room could not be found.");
  } else if (room!.status !== RoomStatus.Available) {
    errorMessages.push("Cannot leave room. The room has to be available.");
  } else {
    const existingUser = users.find((u) => u.username === username);

    if (!existingUser) {
      errorMessages.push("Cannot leave room. The user is not in the room");
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

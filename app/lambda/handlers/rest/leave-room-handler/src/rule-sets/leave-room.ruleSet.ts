import { Room, RoomConnection, RoomStatus } from "@oigamez/core";
import { RuleSetResult } from "@oigamez/http";

export const runLeaveRoomRuleSet = (
  username: string,
  room: Room | undefined,
  connections: RoomConnection[]
): RuleSetResult => {
  const errorMessages: string[] = [];

  if (!room) {
    errorMessages.push("Cannot leave room. The room could not be found.");
  } else if (room!.status !== RoomStatus.available) {
    errorMessages.push("Cannot leave room. The room has to be available.");
  } else {
    const existingUser = connections.find((c) => c.username === username);

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

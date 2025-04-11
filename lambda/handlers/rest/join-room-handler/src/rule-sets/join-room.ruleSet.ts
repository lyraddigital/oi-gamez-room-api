import { Room, RoomConnection, RoomStatus } from "/opt/nodejs/oigamez-core.js";
import { RuleSetResult } from "/opt/nodejs/oigamez-http.js";

export const runJoinRoomRuleSet = (
  username: string,
  room: Room | undefined,
  connections: RoomConnection[]
): RuleSetResult => {
  const errorMessages: string[] = [];

  if (!room) {
    errorMessages.push("Cannot join room. The room could not be found.");
  } else if (room!.status != RoomStatus.available) {
    errorMessages.push("Cannot join room. The room is not available.");
  } else if (room!.curNumOfUsers === room!.maxNumOfUsers) {
    errorMessages.push("Cannot join room. The room is full.");
  } else {
    const existingUser = connections.find((c) => c.username === username);

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

import { Room, RoomConnection, RoomStatus } from "@oigamez/models";
import { RuleSetResult } from "@oigamez/rule-sets";

export const runEnsureRoomConnectionRuleSet = (
  isUserHost: boolean,
  room: Room | undefined,
  username: string,
  connections: RoomConnection[]
): RuleSetResult => {
  if (!room) {
    return {
      isSuccessful: false,
      errorMessages: [
        "Could not connect to room. Could not find it. Check your room code.",
      ],
    };
  }

  if (isUserHost) {
    return {
      isSuccessful: true,
      errorMessages: [],
    };
  }

  const isRoomNotAvailable = room.status === RoomStatus.NotAvailable;
  const isRoomAvailable = room.status === RoomStatus.Available;
  const isRoomFull = room.curNumOfUsers === room.maxNumOfUsers;

  if (isRoomNotAvailable) {
    return {
      isSuccessful: false,
      errorMessages: [
        "Could not connect to room. Could not find it. Check your room code.",
      ],
    };
  } else if (isRoomAvailable && isRoomFull) {
    return {
      isSuccessful: false,
      errorMessages: ["Could not connect to room. The room is full."],
    };
  } else {
    const existingConnection = connections.find((c) => c.username === username);
    const userExists = !!existingConnection;
    const userAlreadyConnected =
      userExists && !existingConnection.lastDisconnected;

    if (isRoomAvailable && userAlreadyConnected) {
      return {
        isSuccessful: false,
        errorMessages: [
          "Could not connect to room. The user is already in the room.",
        ],
      };
    } else if (!isRoomAvailable && !userExists) {
      return {
        isSuccessful: false,
        errorMessages: [
          "Could not connect to room. The room is currently not available.",
        ],
      };
    }
  }

  return {
    isSuccessful: true,
    errorMessages: [],
  };
};

import { HOST_ROOM_INDEX_NAME } from "./host-room-index-name";

export const verifyDynamoHostRoomIndexName = (): void => {
  if (!HOST_ROOM_INDEX_NAME) {
    throw new Error("HOST_ROOM_INDEX_NAME environment variable is not set");
  }
};

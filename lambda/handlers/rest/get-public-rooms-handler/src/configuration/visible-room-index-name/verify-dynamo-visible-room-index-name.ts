import { VISIBLE_ROOM_INDEX_NAME } from "./visible-room-index-name.js";

export const verifyDynamoVisibleRoomIndexName = (): void => {
  if (!VISIBLE_ROOM_INDEX_NAME) {
    throw new Error("VISIBLE_ROOM_INDEX_NAME environment variable is not set");
  }
};

import { verifyCorsAllowedOrigin, verifyDynamoTableName } from "@oigamez/core";
import { verifyPublicRoomsToRetrieve } from "./public-rooms-to-retrieve/index.js";
import { verifyDynamoVisibleRoomIndexName } from "./visible-room-index-name/index.js";

export const validateEnvironment = (): void => {
  verifyCorsAllowedOrigin();
  verifyDynamoTableName();
  verifyDynamoVisibleRoomIndexName();
  verifyPublicRoomsToRetrieve();
};

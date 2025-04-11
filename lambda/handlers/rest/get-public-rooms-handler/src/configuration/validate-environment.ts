import {
  verifyCorsAllowedOrigin,
  verifyDynamoTableName,
} from "/opt/nodejs/oigamez-core.js";
import { verifyPublicRoomsToRetrieve } from "./public-rooms-to-retrieve/index.js";
import { verifyDynamoVisibleRoomIndexName } from "./visible-room-index-name/index.js";

export const validateEnvironment = (): void => {
  verifyCorsAllowedOrigin();
  verifyDynamoTableName();
  verifyDynamoVisibleRoomIndexName();
  verifyPublicRoomsToRetrieve();
};

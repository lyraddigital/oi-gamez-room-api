import {
  verifyCorsAllowedOrigin,
  verifyDynamoTableName,
} from "@oigamez/configuration";

import { verifyPublicRoomsToRetrieve } from "./public-rooms-to-retrieve";
import { verifyDynamoVisibleRoomIndexName } from "./visible-room-index-name";

export const validateEnvironment = (): void => {
  verifyCorsAllowedOrigin();
  verifyDynamoTableName();
  verifyDynamoVisibleRoomIndexName();
  verifyPublicRoomsToRetrieve();
};

import {
  verifyCorsAllowedOrigin,
  verifyDynamoTableName,
  verifyDynamoVisibleRoomIndexName,
  verifyPublicRoomsToRetrieve,
} from "@oigamez/configuration";

export const validateEnvironment = (): void => {
  verifyCorsAllowedOrigin();
  verifyDynamoTableName();
  verifyDynamoVisibleRoomIndexName();
  verifyPublicRoomsToRetrieve();
};

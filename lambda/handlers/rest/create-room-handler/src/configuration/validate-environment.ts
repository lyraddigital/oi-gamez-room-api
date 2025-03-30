import {
  verifyCorsAllowedOrigin,
  verifyDynamoTableName,
  verifyEncryptionKey,
  verifyEncryptionIV,
  verifyJwtExpiryInMinutes,
  verifyJwtSecretKey,
} from "@oigamez/configuration";
import { verifyConnectionWindowInSeconds } from "./connect-window-in-seconds";
import { verifyDynamoHostRoomIndexName } from "./host-room-index-name";

export const validateEnvironment = (): void => {
  verifyConnectionWindowInSeconds();
  verifyCorsAllowedOrigin();
  verifyDynamoTableName();
  verifyDynamoHostRoomIndexName();
  verifyEncryptionKey();
  verifyEncryptionIV();
  verifyJwtExpiryInMinutes();
  verifyJwtSecretKey();
};

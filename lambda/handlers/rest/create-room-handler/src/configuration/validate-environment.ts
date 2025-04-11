import {
  verifyCorsAllowedOrigin,
  verifyDynamoTableName,
  verifyEncryptionKey,
  verifyEncryptionIV,
  verifyJwtExpiryInMinutes,
  verifyJwtSecretKey,
} from "/opt/nodejs/oigamez-core.js";
import { verifyConnectionWindowInSeconds } from "./connect-window-in-seconds/index.js";
import { verifyDynamoHostRoomIndexName } from "./host-room-index-name/index.js";

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

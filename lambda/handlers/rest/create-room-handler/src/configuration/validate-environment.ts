import {
  verifyConnectionWindowInSeconds,
  verifyCorsAllowedOrigin,
  verifyDynamoHostRoomIndexName,
  verifyDynamoTableName,
  verifyEncryptionKey,
  verifyEncryptionIV,
  verifyJwtExpiryInMinutes,
  verifyJwtSecretKey,
} from "@oigamez/configuration";

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

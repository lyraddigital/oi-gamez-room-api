import {
  verifyConnectionWindowInSeconds,
  verifyCorsAllowedOrigin,
  verifyDynamoHostRoomIndexName,
  verifyDynamoTableName,
  verifyJwtExpiryInMinutes,
  verifyJwtSecretKey,
} from "@oigamez/configuration";

export const validateEnvironment = (): void => {
  verifyCorsAllowedOrigin();
  verifyDynamoTableName();
  verifyDynamoHostRoomIndexName();
  verifyConnectionWindowInSeconds();
  verifyJwtExpiryInMinutes();
  verifyJwtSecretKey();
};

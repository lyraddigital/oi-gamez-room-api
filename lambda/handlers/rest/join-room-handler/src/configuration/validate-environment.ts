import {
  verifyCorsAllowedOrigin,
  verifyDynamoConnectionTableName,
  verifyDynamoTableName,
  verifyEncryptionKey,
  verifyEncryptionIV,
  verifyJwtExpiryInMinutes,
  verifyJwtSecretKey,
} from "@oigamez/configuration";

export const validateEnvironment = (): void => {
  verifyCorsAllowedOrigin();
  verifyDynamoTableName();
  verifyDynamoConnectionTableName();
  verifyEncryptionKey();
  verifyEncryptionIV();
  verifyJwtExpiryInMinutes();
  verifyJwtSecretKey();
};

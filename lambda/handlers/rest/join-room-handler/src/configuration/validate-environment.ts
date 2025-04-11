import {
  verifyCorsAllowedOrigin,
  verifyDynamoConnectionTableName,
  verifyDynamoTableName,
  verifyEncryptionKey,
  verifyEncryptionIV,
  verifyJwtExpiryInMinutes,
  verifyJwtSecretKey,
} from "/opt/nodejs/oigamez-core.js";

export const validateEnvironment = (): void => {
  verifyCorsAllowedOrigin();
  verifyDynamoTableName();
  verifyDynamoConnectionTableName();
  verifyEncryptionKey();
  verifyEncryptionIV();
  verifyJwtExpiryInMinutes();
  verifyJwtSecretKey();
};

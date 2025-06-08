import {
  verifyCorsAllowedOrigin,
  verifyDynamoTableName,
  verifyEncryptionIV,
  verifyEncryptionKey,
  verifyJwtExpiryInMinutes,
  verifyJwtSecretKey,
} from "@oigamez/core";

export const validateEnvironment = (): void => {
  verifyCorsAllowedOrigin();
  verifyDynamoTableName();
  verifyEncryptionIV();
  verifyEncryptionKey();
  verifyJwtSecretKey();
  verifyJwtExpiryInMinutes();
};

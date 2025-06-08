import { verifyCorsAllowedOrigin, verifyDynamoTableName } from "@oigamez/core";

export const validateEnvironment = (): void => {
  verifyCorsAllowedOrigin();
  verifyDynamoTableName();
};

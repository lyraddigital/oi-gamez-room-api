import {
  verifyCorsAllowedOrigin,
  verifyDynamoConnectionTableName,
  verifyDynamoTableName,
} from "@oigamez/core";

export const validateEnvironment = (): void => {
  verifyCorsAllowedOrigin();
  verifyDynamoTableName();
  verifyDynamoConnectionTableName();
};

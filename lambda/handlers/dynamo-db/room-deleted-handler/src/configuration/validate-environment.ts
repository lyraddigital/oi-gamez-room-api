import { verifyDynamoTableName } from "/opt/nodejs/oigamez-core";

export const validateEnvironment = (): void => {
  verifyDynamoTableName();
};

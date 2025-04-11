import { verifyDynamoTableName } from "/opt/nodejs/oigamez-core.js";

export const validateEnvironment = (): void => {
  verifyDynamoTableName();
};

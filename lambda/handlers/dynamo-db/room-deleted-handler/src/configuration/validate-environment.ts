import { verifyDynamoTableName } from "@oigamez/core";

export const validateEnvironment = (): void => {
  verifyDynamoTableName();
};

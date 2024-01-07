import { verifyDynamoTableName } from "@oigamez/configuration";

export const validateEnvironment = (): void => {
  verifyDynamoTableName();
};

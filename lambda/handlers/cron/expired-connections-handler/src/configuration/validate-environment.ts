import {
  verifyDynamoConnectionTableName,
  verifyDynamoConnectionIndexName,
  verifyDynamoTableName,
} from "@oigamez/configuration";

export const validateEnvironment = (): void => {
  verifyDynamoTableName();
  verifyDynamoConnectionTableName();
  verifyDynamoConnectionIndexName();
};

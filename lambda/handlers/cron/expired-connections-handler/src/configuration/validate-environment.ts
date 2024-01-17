import {
  verifyDynamoConnectionTableName,
  verifyDynamoLastDisconnectedIndexName,
  verifyDynamoTableName,
} from "@oigamez/configuration";

export const validateEnvironment = (): void => {
  verifyDynamoTableName();
  verifyDynamoLastDisconnectedIndexName();
  verifyDynamoConnectionTableName();
};

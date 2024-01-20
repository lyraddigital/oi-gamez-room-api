import {
  verifyDynamoConnectionTableName,
  verifyDynamoLastDisconnectedIndexName,
  verifyDynamoTableName,
  verifyExpiredDisconnectionWindowInSeconds,
  verifyUserDisconnectionEventBusName,
} from "@oigamez/configuration";

export const validateEnvironment = (): void => {
  verifyDynamoTableName();
  verifyDynamoLastDisconnectedIndexName();
  verifyDynamoConnectionTableName();
  verifyExpiredDisconnectionWindowInSeconds();
  verifyUserDisconnectionEventBusName();
};

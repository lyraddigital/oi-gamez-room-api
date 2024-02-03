import {
  verifyDynamoConnectionTableName,
  verifyDynamoLastDisconnectedIndexName,
  verifyDynamoTableName,
  verifyExpiredDisconnectionWindowInSeconds,
  verifyEbName,
  verifyEbInternalEventSourceName,
} from "@oigamez/configuration";

export const validateEnvironment = (): void => {
  verifyDynamoTableName();
  verifyDynamoLastDisconnectedIndexName();
  verifyDynamoConnectionTableName();
  verifyExpiredDisconnectionWindowInSeconds();
  verifyEbName();
  verifyEbInternalEventSourceName();
};

import {
  verifyDynamoConnectionTableName,
  verifyDynamoTableName,
  verifyEbName,
  verifyEbInternalEventSourceName,
} from "@oigamez/core";

import { verifyDynamoLastDisconnectedIndexName } from "./dynamo-last-disconnected-index-name";
import { verifyExpiredDisconnectionWindowInSeconds } from "./expired-disconnection-window-in-seconds";

export const validateEnvironment = (): void => {
  verifyDynamoTableName();
  verifyDynamoLastDisconnectedIndexName();
  verifyDynamoConnectionTableName();
  verifyExpiredDisconnectionWindowInSeconds();
  verifyEbName();
  verifyEbInternalEventSourceName();
};

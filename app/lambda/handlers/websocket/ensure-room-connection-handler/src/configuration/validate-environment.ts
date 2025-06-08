import {
  verifyDynamoTableName,
  verifyDynamoConnectionTableName,
  verifyEbName,
  verifyEbInternalEventSourceName,
  verifyExternalEbName,
  verifyEbExternalEventSourceName,
} from "@oigamez/core";

import { verifyUpdatedConnectWindowInSeconds } from "./updated-connect-window";

export const validateEnvironment = (): void => {
  verifyDynamoTableName();
  verifyDynamoConnectionTableName();
  verifyUpdatedConnectWindowInSeconds();
  verifyEbName();
  verifyEbInternalEventSourceName();
  verifyExternalEbName();
  verifyEbExternalEventSourceName();
};

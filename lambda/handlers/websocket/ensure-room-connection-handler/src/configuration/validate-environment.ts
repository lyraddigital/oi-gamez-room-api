import {
  verifyDynamoTableName,
  verifyDynamoConnectionTableName,
  verifyEbName,
  verifyEbInternalEventSourceName,
  verifyExternalEbName,
  verifyEbExternalEventSourceName,
} from "/opt/nodejs/oigamez-core";

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

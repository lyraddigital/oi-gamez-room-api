import {
  verifyDynamoTableName,
  verifyDynamoConnectionTableName,
  verifyEbName,
  verifyEbInternalEventSourceName,
  verifyExternalEbName,
  verifyEbExternalEventSourceName,
} from "/opt/nodejs/oigamez-core.js";

import { verifyUpdatedConnectWindowInSeconds } from "./updated-connect-window/index.js";

export const validateEnvironment = (): void => {
  verifyDynamoTableName();
  verifyDynamoConnectionTableName();
  verifyUpdatedConnectWindowInSeconds();
  verifyEbName();
  verifyEbInternalEventSourceName();
  verifyExternalEbName();
  verifyEbExternalEventSourceName();
};

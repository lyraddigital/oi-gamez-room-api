import {
  verifyDynamoConnectionTableName,
  verifyEbExternalEventSourceName,
  verifyExternalEbName,
  verifyRoomSocketApiEndpoint,
} from "/opt/nodejs/oigamez-core.js";

export const validateEnvironment = (): void => {
  verifyDynamoConnectionTableName();
  verifyRoomSocketApiEndpoint();
  verifyExternalEbName();
  verifyEbExternalEventSourceName();
};

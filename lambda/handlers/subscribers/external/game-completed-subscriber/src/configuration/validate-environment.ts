import {
  verifyDynamoConnectionTableName,
  verifyDynamoTableName,
  verifyRoomSocketApiEndpoint,
} from "/opt/nodejs/oigamez-core.js";

export const validateEnvironment = (): void => {
  verifyDynamoTableName();
  verifyDynamoConnectionTableName();
  verifyRoomSocketApiEndpoint();
};

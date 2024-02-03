import {
  verifyDynamoConnectionTableName,
  verifyRoomSocketApiEndpoint,
  verifyExternalEbName,
  verifyEbExternalEventSourceName,
} from "@oigamez/configuration";

export const validateEnvironment = (): void => {
  verifyDynamoConnectionTableName();
  verifyRoomSocketApiEndpoint();
  verifyExternalEbName();
  verifyEbExternalEventSourceName();
};

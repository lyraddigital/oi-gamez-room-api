import {
  verifyDynamoConnectionTableName,
  verifyEbExternalEventSourceName,
  verifyExternalEbName,
  verifyRoomSocketApiEndpoint,
} from "@oigamez/configuration";

export const validateEnvironment = (): void => {
  verifyDynamoConnectionTableName();
  verifyRoomSocketApiEndpoint();
  verifyExternalEbName();
  verifyEbExternalEventSourceName();
};

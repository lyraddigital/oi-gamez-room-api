import {
  verifyDynamoConnectionTableName,
  verifyRoomSocketApiEndpoint,
} from "@oigamez/configuration";

export const validateEnvironment = (): void => {
  verifyDynamoConnectionTableName();
  verifyRoomSocketApiEndpoint();
};

import {
  verifyRoomSocketApiEndpoint,
  verifyExternalEbName,
  verifyEbExternalEventSourceName,
} from "@oigamez/configuration";

export const validateEnvironment = (): void => {
  verifyRoomSocketApiEndpoint();
  verifyExternalEbName();
  verifyEbExternalEventSourceName();
};

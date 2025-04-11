import {
  verifyRoomSocketApiEndpoint,
  verifyExternalEbName,
  verifyEbExternalEventSourceName,
} from "/opt/nodejs/oigamez-core.js";

export const validateEnvironment = (): void => {
  verifyRoomSocketApiEndpoint();
  verifyExternalEbName();
  verifyEbExternalEventSourceName();
};

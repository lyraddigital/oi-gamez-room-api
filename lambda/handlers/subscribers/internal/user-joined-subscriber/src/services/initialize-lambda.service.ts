import {
  EB_EXTERNAL_EB_NAME,
  EB_EXTERNAL_EVENT_SOURCE_NAME,
  ROOM_SOCKET_API_ENDPOINT,
} from "/opt/nodejs/oigamez-core.js";
import {
  initialize,
  initializeEventPublisherForExternal,
} from "/opt/nodejs/oigamez-communication.js";

export const initializeLambda = () => {
  initialize(ROOM_SOCKET_API_ENDPOINT);
  initializeEventPublisherForExternal(
    EB_EXTERNAL_EB_NAME,
    EB_EXTERNAL_EVENT_SOURCE_NAME
  );
};

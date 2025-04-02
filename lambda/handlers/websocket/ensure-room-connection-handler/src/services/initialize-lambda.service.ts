import {
  initializeEventPublisherForExternal,
  initializeEventPublisherForInternal,
} from "/opt/nodejs/oigamez-communication";

import {
  EB_EXTERNAL_EB_NAME,
  EB_EXTERNAL_EVENT_SOURCE_NAME,
  EB_INTERNAL_EB_NAME,
  EB_INTERNAL_EVENT_SOURCE_NAME,
  ROOM_SOCKET_API_ENDPOINT,
} from "/opt/nodejs/oigamez-core";
import { initialize } from "/opt/nodejs/oigamez-communication";

export const initializeLambda = () => {
  initialize(ROOM_SOCKET_API_ENDPOINT);
  initializeEventPublisherForInternal(
    EB_INTERNAL_EB_NAME,
    EB_INTERNAL_EVENT_SOURCE_NAME
  );
  initializeEventPublisherForExternal(
    EB_EXTERNAL_EB_NAME,
    EB_EXTERNAL_EVENT_SOURCE_NAME
  );
};

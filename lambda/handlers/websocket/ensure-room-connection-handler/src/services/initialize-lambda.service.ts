import { initialize } from "@oigamez/communication";
import {
  initializeEventPublisherForExternal,
  initializeEventPublisherForInternal,
} from "@oigamez/event-bridge";

import {
  EB_EXTERNAL_EB_NAME,
  EB_EXTERNAL_EVENT_SOURCE_NAME,
  EB_INTERNAL_EB_NAME,
  EB_INTERNAL_EVENT_SOURCE_NAME,
  ROOM_SOCKET_API_ENDPOINT,
} from "/opt/nodejs/oigamez-core";

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

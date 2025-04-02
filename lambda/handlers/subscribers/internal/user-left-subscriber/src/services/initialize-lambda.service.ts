import { initialize } from "@oigamez/communication";
import { initializeEventPublisherForExternal } from "@oigamez/event-bridge";

import {
  EB_EXTERNAL_EB_NAME,
  EB_EXTERNAL_EVENT_SOURCE_NAME,
  ROOM_SOCKET_API_ENDPOINT,
} from "/opt/nodejs/oigamez-core";

export const initializeLambda = () => {
  initialize(ROOM_SOCKET_API_ENDPOINT);
  initializeEventPublisherForExternal(
    EB_EXTERNAL_EB_NAME,
    EB_EXTERNAL_EVENT_SOURCE_NAME
  );
};

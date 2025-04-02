import { initializeEventPublisherForInternal } from "@oigamez/event-bridge";

import {
  EB_INTERNAL_EB_NAME,
  EB_INTERNAL_EVENT_SOURCE_NAME,
} from "/opt/nodejs/oigamez-core";

export const initializeLambda = () => {
  initializeEventPublisherForInternal(
    EB_INTERNAL_EB_NAME,
    EB_INTERNAL_EVENT_SOURCE_NAME
  );
};

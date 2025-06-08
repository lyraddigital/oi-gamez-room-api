import {
  EB_INTERNAL_EB_NAME,
  EB_INTERNAL_EVENT_SOURCE_NAME,
} from "@oigamez/core";
import { initializeEventPublisherForInternal } from "@oigamez/communication";

export const initializeLambda = () => {
  initializeEventPublisherForInternal(
    EB_INTERNAL_EB_NAME,
    EB_INTERNAL_EVENT_SOURCE_NAME
  );
};

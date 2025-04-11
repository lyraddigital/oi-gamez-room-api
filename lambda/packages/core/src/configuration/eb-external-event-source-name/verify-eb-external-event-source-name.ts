import { EB_EXTERNAL_EVENT_SOURCE_NAME } from "./eb-external-event-source-name.js";

export const verifyEbExternalEventSourceName = (): void => {
  if (!EB_EXTERNAL_EVENT_SOURCE_NAME) {
    throw new Error(
      "EB_EXTERNAL_EVENT_SOURCE_NAME environment variable is not set"
    );
  }
};

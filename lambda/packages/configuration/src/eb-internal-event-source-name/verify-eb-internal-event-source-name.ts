import { EB_INTERNAL_EVENT_SOURCE_NAME } from "./eb-internal-event-source-name";

export const verifyEbInternalEventSourceName = (): void => {
  if (!EB_INTERNAL_EVENT_SOURCE_NAME) {
    throw new Error(
      "EB_INTERNAL_EVENT_SOURCE_NAME environment variable is not set"
    );
  }
};

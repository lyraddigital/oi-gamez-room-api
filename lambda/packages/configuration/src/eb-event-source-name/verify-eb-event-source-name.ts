import { EB_EVENT_SOURCE_NAME } from "./eb-event-source-name";

export const verifyEbEventSourceName = (): void => {
  if (!EB_EVENT_SOURCE_NAME) {
    throw new Error("EB_EVENT_SOURCE_NAME environment variable is not set");
  }
};

import { EventBridgeEvent } from "aws-lambda";

import {
  EventBridgeReceivedEventType,
  GameInitializedEvent,
} from "@oigamez/event-bridge";

export const handler = async (
  event: EventBridgeEvent<
    EventBridgeReceivedEventType.gameInitialized,
    GameInitializedEvent
  >
): Promise<void> => {
  console.log("Event source: ", event.source);
  console.log("Event detail type: ", event["detail-type"]);
  console.log("Event detail: ", event.detail);

  await Promise.resolve({});
};

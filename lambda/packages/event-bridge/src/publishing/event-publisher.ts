import {
  PutEventsCommand,
  PutEventsCommandInput,
  PutEventsRequestEntry,
} from "@aws-sdk/client-eventbridge";

import {
  EB_INTERNAL_EB_NAME,
  EB_INTERNAL_EVENT_SOURCE_NAME,
} from "@oigamez/configuration";

import { client } from "../client";
import { EventBridgeExternalEvent, EventBridgeInternalEvent } from "../events";

const publishEvents = async <
  T extends EventBridgeInternalEvent | EventBridgeExternalEvent
>(
  eventBusName: string,
  eventBusSourceName: string,
  items: T[]
): Promise<void> => {
  const putEventsCommandInput: PutEventsCommandInput = {
    Entries: [
      ...items.map<PutEventsRequestEntry>((item: T) => ({
        EventBusName: eventBusName,
        Source: eventBusSourceName,
        Detail: JSON.stringify(item),
        DetailType: item.detailType,
      })),
    ],
  };

  const command = new PutEventsCommand(putEventsCommandInput);

  await client.send(command);
};

export const publishInternalEvents = async <T extends EventBridgeInternalEvent>(
  items: T[]
): Promise<void> => {
  await publishEvents(
    EB_INTERNAL_EB_NAME!,
    EB_INTERNAL_EVENT_SOURCE_NAME!,
    items
  );
};

export const publishExternalEvents = async <T extends EventBridgeExternalEvent>(
  items: T[]
): Promise<void> => {
  await publishEvents(
    EB_INTERNAL_EB_NAME!,
    EB_INTERNAL_EVENT_SOURCE_NAME!,
    items
  );
};

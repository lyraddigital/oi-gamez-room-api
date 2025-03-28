import {
  PutEventsCommand,
  PutEventsCommandInput,
  PutEventsRequestEntry,
} from "@aws-sdk/client-eventbridge";

import {
  EB_EXTERNAL_EB_NAME,
  EB_INTERNAL_EB_NAME,
  EB_EXTERNAL_EVENT_SOURCE_NAME,
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
  try {
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
  } catch (e: unknown) {
    console.log(
      `Error while trying to send a message to the event bus ${eventBusName} with source ${eventBusSourceName}`,
      e
    );
  }
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
    EB_EXTERNAL_EB_NAME!,
    EB_EXTERNAL_EVENT_SOURCE_NAME!,
    items
  );
};

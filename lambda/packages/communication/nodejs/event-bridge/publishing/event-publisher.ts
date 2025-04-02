import {
  PutEventsCommand,
  PutEventsCommandInput,
  PutEventsRequestEntry,
} from "@aws-sdk/client-eventbridge";

import { client } from "../client";
import { EventBridgeEvent } from "../events";
import { getPublishingOptions } from "./publishing-options";

const publishEvents = async <T extends EventBridgeEvent>(
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

export const publishInternalEvents = async <T extends EventBridgeEvent>(
  items: T[]
): Promise<void> => {
  const publishingOptions = getPublishingOptions();

  await publishEvents(
    publishingOptions.internalEventBusName!,
    publishingOptions.internalEventBusSourceName!,
    items
  );
};

export const publishExternalEvents = async <T extends EventBridgeEvent>(
  items: T[]
): Promise<void> => {
  const publishingOptions = getPublishingOptions();

  await publishEvents(
    publishingOptions.externalEventBusName!,
    publishingOptions.externalEventBusSourceName!,
    items
  );
};

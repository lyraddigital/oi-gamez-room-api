import {
  PutEventsCommand,
  PutEventsCommandInput,
  PutEventsRequestEntry,
} from "@aws-sdk/client-eventbridge";

import { EB_EB_NAME, EB_EVENT_SOURCE_NAME } from "@oigamez/configuration";

import { client } from "../client";
import { EventBridgeEvent } from "../events";

export const publishEvents = async <T extends EventBridgeEvent>(
  items: T[]
): Promise<void> => {
  const putEventsCommandInput: PutEventsCommandInput = {
    Entries: [
      ...items.map<PutEventsRequestEntry>((item: T) => ({
        EventBusName: EB_EB_NAME,
        Source: EB_EVENT_SOURCE_NAME,
        Detail: JSON.stringify(item),
        DetailType: item.detailType,
      })),
    ],
  };

  const command = new PutEventsCommand(putEventsCommandInput);

  await client.send(command);
};

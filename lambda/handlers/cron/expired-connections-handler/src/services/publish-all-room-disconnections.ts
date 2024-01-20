import {
  PutEventsCommand,
  PutEventsCommandInput,
  PutEventsRequestEntry,
} from "@aws-sdk/client-eventbridge";

import { USER_DISCONNECTION_EB_NAME } from "@oigamez/configuration";
import { client } from "@oigamez/event-bridge";

export const publishAllRoomDisconnections = async (
  roomCodes: string[]
): Promise<void> => {
  const putEventsCommandInput: PutEventsCommandInput = {
    Entries: [
      ...roomCodes.map<PutEventsRequestEntry>((rc) => ({
        EventBusName: USER_DISCONNECTION_EB_NAME,
        Source: "room.expired-connection-handler",
        Detail: JSON.stringify({
          roomCode: rc,
        }),
        DetailType: "room.room-disconnection",
      })),
    ],
  };
  const command = new PutEventsCommand(putEventsCommandInput);

  await client.send(command);
};

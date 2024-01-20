import {
  PutEventsCommand,
  PutEventsCommandInput,
  PutEventsRequestEntry,
} from "@aws-sdk/client-eventbridge";

import { USER_DISCONNECTION_EB_NAME } from "@oigamez/configuration";
import { client } from "@oigamez/event-bridge";
import { RoomConnection } from "@oigamez/models";

export const publishAllUserDisconnections = async (
  userDisconnections: RoomConnection[]
): Promise<void> => {
  const putEventsCommandInput: PutEventsCommandInput = {
    Entries: [
      ...userDisconnections.map<PutEventsRequestEntry>((ud) => ({
        EventBusName: USER_DISCONNECTION_EB_NAME,
        Source: "room.expired-connection-handler",
        Detail: JSON.stringify({
          roomCode: ud.roomCode,
          username: ud.username,
        }),
        DetailType: "room.user-disconnection",
      })),
    ],
  };
  const command = new PutEventsCommand(putEventsCommandInput);

  await client.send(command);
};

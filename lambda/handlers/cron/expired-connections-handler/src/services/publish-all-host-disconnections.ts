import {
  PutEventsCommand,
  PutEventsCommandInput,
  PutEventsRequestEntry,
} from "@aws-sdk/client-eventbridge";

import { USER_DISCONNECTION_EB_NAME } from "@oigamez/configuration";

import { client } from "@oigamez/event-bridge";
import { Room, RoomStatus } from "@oigamez/models";

export const publishAllHostDisconnections = async (
  hostedRooms: Room[]
): Promise<void> => {
  const putEventsCommandInput: PutEventsCommandInput = {
    Entries: [
      ...hostedRooms.map<PutEventsRequestEntry>((hr) => ({
        EventBusName: USER_DISCONNECTION_EB_NAME,
        Source: "room.expired-connection-handler",
        Detail: JSON.stringify({
          roomCode: hr.code,
          username: hr.hostUsername,
          canRemoveRoom:
            hr.status === RoomStatus.Available ||
            hr.status === RoomStatus.NotAvailable,
        }),
        DetailType: "room.host-disconnection",
      })),
    ],
  };
  const command = new PutEventsCommand(putEventsCommandInput);

  await client.send(command);
};

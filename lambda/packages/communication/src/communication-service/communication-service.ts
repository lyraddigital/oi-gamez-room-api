import {
  DeleteConnectionCommand,
  PostToConnectionCommand,
} from "@aws-sdk/client-apigatewaymanagementapi";

import { RoomConnection } from "@oigamez/models";

import { client } from "../client";

const sendCommunicationEvent = async <T>(
  connectionId: string,
  communicationEventPayload?: T
): Promise<void> => {
  if (connectionId && communicationEventPayload) {
    try {
      const command = new PostToConnectionCommand({
        ConnectionId: connectionId,
        Data: JSON.stringify(communicationEventPayload),
      });

      await client.send(command);
    } catch (e: unknown) {
      console.log(
        "Error while trying to send a communication message to a socket",
        e
      );
    }
  }
};

export const broadcast = async <T>(
  connections: RoomConnection[],
  payload: T,
  excludeConnectionIds: string[] = []
): Promise<void> => {
  const filteredConnections = connections.filter(
    (c) => !excludeConnectionIds.find((eci) => eci === c.connectionId)
  );

  const eventPromises = filteredConnections.map((fc) =>
    sendCommunicationEvent(fc.connectionId, payload)
  );

  await Promise.all(eventPromises);
};

export const disconnectConnection = async (
  connectionId: string
): Promise<void> => {
  const command = new DeleteConnectionCommand({ ConnectionId: connectionId });
  await client.send(command);
};

export const disconnectAllConnections = async (
  roomConnections: RoomConnection[]
): Promise<void> => {
  const rcPromises = roomConnections.map((rc) =>
    disconnectConnection(rc.connectionId)
  );
  await Promise.all(rcPromises);
};
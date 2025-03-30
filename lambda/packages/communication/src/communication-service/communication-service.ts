import {
  DeleteConnectionCommand,
  PostToConnectionCommand,
} from "@aws-sdk/client-apigatewaymanagementapi";

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
  connectionIds: string[],
  payload: T
): Promise<void> => {
  const eventPromises = connectionIds.map((cId) =>
    sendCommunicationEvent(cId, payload)
  );

  await Promise.all(eventPromises);
};

export const closeConnection = async (connectionId: string): Promise<void> => {
  if (connectionId) {
    try {
      const command = new DeleteConnectionCommand({
        ConnectionId: connectionId,
      });

      await client.send(command);
    } catch (e: unknown) {
      console.log("Error while trying to delete connection", e);
    }
  }
};

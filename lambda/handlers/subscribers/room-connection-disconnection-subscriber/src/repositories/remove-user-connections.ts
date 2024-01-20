import {
  BatchWriteItemCommand,
  BatchWriteItemCommandInput,
  WriteRequest,
} from "@aws-sdk/client-dynamodb";

import { CONNECTION_DYNAMO_TABLE_NAME } from "@oigamez/configuration";
import { dbClient, keys } from "@oigamez/dynamodb";
import { RoomConnection } from "@oigamez/models";

export const removeUserConnections = async (
  roomConnections: RoomConnection[]
): Promise<void> => {
  const batchConnectionDeletes: WriteRequest[] = roomConnections.map((rc) => ({
    DeleteRequest: {
      Key: keys.connection(rc.roomCode, rc.username),
    },
  }));

  const batchWriteItemCommandInput: BatchWriteItemCommandInput = {
    RequestItems: {
      [`${CONNECTION_DYNAMO_TABLE_NAME}`]: batchConnectionDeletes,
    },
  };

  const batchWriteItemCommand = new BatchWriteItemCommand(
    batchWriteItemCommandInput
  );

  await dbClient.send(batchWriteItemCommand);
};

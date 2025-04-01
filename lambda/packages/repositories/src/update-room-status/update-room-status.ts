import {
  UpdateItemCommand,
  UpdateItemCommandInput,
} from "@aws-sdk/client-dynamodb";

import { DYNAMO_TABLE_NAME } from "/opt/nodejs/oigamez-core";
import {
  dbClient,
  dynamoFieldNames,
  dynamoFieldValues,
  expressions,
  keys,
} from "@oigamez/dynamodb";
import { RoomStatus } from "/opt/nodejs/oigamez-core";

export const updateRoomStatus = async (
  roomCode: string,
  status: RoomStatus
): Promise<void> => {
  const updateItemCommandInput: UpdateItemCommandInput = {
    TableName: DYNAMO_TABLE_NAME,
    Key: keys.room(roomCode),
    UpdateExpression: "SET #status = :status",
    ConditionExpression: expressions.common.keysExists,
    ExpressionAttributeNames: {
      "#status": dynamoFieldNames.room.status,
    },
    ExpressionAttributeValues: {
      ":status": dynamoFieldValues.room.status(status),
    },
  };

  const updateItemCommand = new UpdateItemCommand(updateItemCommandInput);

  await dbClient.send(updateItemCommand);
};

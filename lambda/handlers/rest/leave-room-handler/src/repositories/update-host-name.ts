import {
  UpdateItemCommand,
  UpdateItemCommandInput,
} from "@aws-sdk/client-dynamodb";

import { DYNAMO_TABLE_NAME } from "@oigamez/configuration";
import {
  dbClient,
  dynamoFieldNames,
  dynamoFieldValues,
  expressions,
  keys,
} from "@oigamez/dynamodb";

export const updateHostName = async (
  roomCode: string,
  newHostUsername: string
): Promise<void> => {
  const updateItemCommandInput: UpdateItemCommandInput = {
    TableName: DYNAMO_TABLE_NAME,
    Key: keys.room(roomCode),
    UpdateExpression: "ADD #hostUsername :newHostUsername",
    ConditionExpression: expressions.common.keysExists,
    ExpressionAttributeNames: {
      "#hostUsername": dynamoFieldNames.room.hostUsername,
    },
    ExpressionAttributeValues: {
      ":newHostUsername": dynamoFieldValues.room.hostUsername(newHostUsername),
    },
  };

  const updateItemCommand = new UpdateItemCommand(updateItemCommandInput);

  await dbClient.send(updateItemCommand);
};

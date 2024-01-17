import {
  UpdateItemCommand,
  UpdateItemCommandInput,
} from "@aws-sdk/client-dynamodb";

import { CONNECTION_DYNAMO_TABLE_NAME } from "@oigamez/configuration";
import {
  dbClient,
  dynamoFieldNames,
  dynamoFieldValues,
  expressions,
  keys,
} from "@oigamez/dynamodb";

import { RoomConnection } from "../models";

export const updateConnectionDisconnectionTime = async (
  connection: RoomConnection,
  ttl: number
): Promise<void> => {
  const updateItemCommandInput: UpdateItemCommandInput = {
    TableName: CONNECTION_DYNAMO_TABLE_NAME,
    Key: keys.connection(connection.roomCode, connection.username),
    UpdateExpression: "SET #lastDisconnected = :lastDisconnected",
    ConditionExpression: expressions.common.keysExists,
    ExpressionAttributeNames: {
      "#lastDisconnected": dynamoFieldNames.connection.lastDisconnected,
    },
    ExpressionAttributeValues: {
      ":lastDisconnected": dynamoFieldValues.connection.lastDisconnected(ttl),
    },
  };

  const queryCommand = new UpdateItemCommand(updateItemCommandInput);

  await dbClient.send(queryCommand);
};

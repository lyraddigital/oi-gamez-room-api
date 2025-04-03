import {
  UpdateItemCommand,
  UpdateItemCommandInput,
} from "@aws-sdk/client-dynamodb";

import {
  CONNECTION_DYNAMO_TABLE_NAME,
  RoomConnection,
} from "/opt/nodejs/oigamez-core";
import {
  dbClient,
  dynamoFieldNames,
  dynamoFieldValues,
  expressions,
  keys,
} from "/opt/nodejs/oigamez-data";

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

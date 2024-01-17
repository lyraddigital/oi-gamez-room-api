import { TransactWriteItem } from "@aws-sdk/client-dynamodb";

import { CONNECTION_DYNAMO_TABLE_NAME } from "@oigamez/configuration";
import {
  dynamoFieldNames,
  dynamoFieldValues,
  expressions,
  keys,
} from "@oigamez/dynamodb";

import { RoomConnection } from "../models";

export const updateConnectionDisconnectionTime = (
  connection: RoomConnection,
  ttl: number
): TransactWriteItem => {
  return {
    Update: {
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
    },
  };
};

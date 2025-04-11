import { QueryCommand, QueryCommandInput } from "@aws-sdk/client-dynamodb";

import { CONNECTION_DYNAMO_TABLE_NAME, RoomConnection } from "@oigamez/core";
import {
  dbClient,
  dynamoFieldNames,
  dynamoFieldValues,
} from "../../dynamodb/index.js";
import { mapFromDynamoToConnection } from "../../mappers/index.js";

export const getRoomConnections = async (
  roomCode: string,
  ttl?: number
): Promise<RoomConnection[]> => {
  const input: QueryCommandInput = {
    TableName: CONNECTION_DYNAMO_TABLE_NAME,
    KeyConditionExpression: "#pk = :pk",
    ExpressionAttributeNames: {
      "#pk": dynamoFieldNames.common.pk,
    },
    ExpressionAttributeValues: {
      ":pk": dynamoFieldValues.connection.pk(roomCode),
    },
  };

  if (ttl) {
    input.FilterExpression = "#ttl > :ttl";
    input.ExpressionAttributeNames!["#ttl"] = dynamoFieldNames.common.ttl;
    input.ExpressionAttributeValues![":ttl"] =
      dynamoFieldValues.connection.ttl(ttl);
  }

  const command = new QueryCommand(input);
  const response = await dbClient.send(command);

  if (!response?.Items || response.Items.length <= 0) {
    return [];
  }

  return response.Items.map(mapFromDynamoToConnection);
};

import { QueryCommand, QueryCommandInput } from "@aws-sdk/client-dynamodb";

import { CONNECTION_DYNAMO_TABLE_NAME } from "@oigamez/configuration";
import {
  dbClient,
  dynamoFieldNames,
  dynamoFieldValues,
} from "@oigamez/dynamodb";
import { mapFromDynamoToConnection } from "@oigamez/mappers";
import { RoomConnection } from "@oigamez/models";

export const getRoomConnections = async (
  roomCode: string,
  ttl?: number
): Promise<RoomConnection[]> => {
  const input: QueryCommandInput = {
    TableName: CONNECTION_DYNAMO_TABLE_NAME,
    KeyConditionExpression: "#pk = :pk",
    ExpressionAttributeNames: {
      "#pk": dynamoFieldNames.connection.pk,
    },
    ExpressionAttributeValues: {
      ":pk": dynamoFieldValues.connection.pk(roomCode),
    },
  };

  if (ttl) {
    input.FilterExpression = "#ttl > :ttl";
    input.ExpressionAttributeNames!["#ttl"] = dynamoFieldNames.connection.ttl;
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

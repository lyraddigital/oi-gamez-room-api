import { QueryCommand, QueryCommandInput } from "@aws-sdk/client-dynamodb";

import { DYNAMO_TABLE_NAME } from "/opt/nodejs/oigamez-core";
import {
  dbClient,
  dynamoFieldNames,
  dynamoFieldValues,
} from "@oigamez/dynamodb";
import { mapFromDynamoToRoom } from "@oigamez/mappers";
import { Room } from "/opt/nodejs/oigamez-core";

export const getRoomByCode = async (
  roomCode: string,
  ttl?: number
): Promise<Room | undefined> => {
  const input: QueryCommandInput = {
    TableName: DYNAMO_TABLE_NAME,
    KeyConditionExpression: "#pk = :pk AND #sk = :sk",
    ExpressionAttributeNames: {
      "#pk": dynamoFieldNames.common.pk,
      "#sk": dynamoFieldNames.common.sk,
    },
    ExpressionAttributeValues: {
      ":pk": dynamoFieldValues.room.pk(roomCode),
      ":sk": dynamoFieldValues.room.sk,
    },
  };

  if (ttl) {
    input.FilterExpression = "#ttl > :ttl";
    input.ExpressionAttributeNames!["#ttl"] = dynamoFieldNames.common.ttl;
    input.ExpressionAttributeValues![":ttl"] =
      dynamoFieldValues.common.ttl(ttl);
  }

  const command = new QueryCommand(input);
  const response = await dbClient.send(command);

  if (!response?.Items || response.Items.length <= 0) {
    return undefined;
  }

  return mapFromDynamoToRoom(response.Items[0]);
};

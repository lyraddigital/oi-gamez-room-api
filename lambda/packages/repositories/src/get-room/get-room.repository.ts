import { QueryCommand, QueryCommandInput } from "@aws-sdk/client-dynamodb";
import { DYNAMO_TABLE_NAME } from "@oigamez/configuration";
import {
  dbClient,
  dynamoFieldNames,
  dynamoFieldValues,
} from "@oigamez/dynamodb";
import { mapFromDynamoToRoom } from "@oigamez/mappers";
import { Room } from "@oigamez/models";

export const getRoom = async (
  roomCode: string,
  ttl: number
): Promise<Room | undefined> => {
  const input: QueryCommandInput = {
    TableName: DYNAMO_TABLE_NAME,
    KeyConditionExpression: "#pk = :pk AND #sk = :sk",
    FilterExpression: "#ttl > :ttl",
    ExpressionAttributeNames: {
      "#pk": dynamoFieldNames.common.pk,
      "#sk": dynamoFieldNames.common.sk,
      "#ttl": dynamoFieldNames.common.ttl,
    },
    ExpressionAttributeValues: {
      ":pk": dynamoFieldValues.room.pk(roomCode),
      ":sk": dynamoFieldValues.room.sk,
      ":ttl": dynamoFieldValues.common.ttl(ttl),
    },
  };
  const command = new QueryCommand(input);
  const response = await dbClient.send(command);

  if (!response?.Items?.length) {
    return undefined;
  }

  return mapFromDynamoToRoom(response.Items[0]);
};

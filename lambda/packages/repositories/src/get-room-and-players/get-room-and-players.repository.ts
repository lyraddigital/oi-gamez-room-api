import { QueryCommand, QueryCommandInput } from "@aws-sdk/client-dynamodb";
import { DYNAMO_TABLE_NAME } from "@oigamez/configuration";
import {
  dbClient,
  dynamoFieldNames,
  dynamoFieldValues,
  getDynamoString,
} from "@oigamez/dynamodb";
import { mapFromDynamoToRoom, mapFromDynamoToUser } from "@oigamez/mappers";
import { Room, User } from "@oigamez/models";

export const getRoomAndPlayers = async (
  roomCode: string,
  ttl: number
): Promise<[Room | undefined, User[]]> => {
  const input: QueryCommandInput = {
    TableName: DYNAMO_TABLE_NAME,
    KeyConditionExpression: "#pk = :pk",
    FilterExpression: "#ttl > :ttl",
    ExpressionAttributeNames: {
      "#pk": dynamoFieldNames.common.pk,
      "#ttl": dynamoFieldNames.common.ttl,
    },
    ExpressionAttributeValues: {
      ":pk": dynamoFieldValues.room.pk(roomCode),
      ":ttl": dynamoFieldValues.common.ttl(ttl),
    },
  };
  const command = new QueryCommand(input);
  const response = await dbClient.send(command);

  if (!response?.Items?.length) {
    return [undefined, []];
  }

  const roomDocument = response.Items.find(
    (doc) =>
      getDynamoString(doc[dynamoFieldNames.common.type]) ===
      getDynamoString(dynamoFieldValues.room.type)
  );

  const userDocuments = response.Items.filter(
    (doc) =>
      getDynamoString(doc[dynamoFieldNames.common.type]) ===
      getDynamoString(dynamoFieldValues.user.type)
  );
  const room = !!roomDocument ? mapFromDynamoToRoom(roomDocument) : undefined;
  const users = userDocuments.map((ud) => mapFromDynamoToUser(ud));

  return [room, users];
};

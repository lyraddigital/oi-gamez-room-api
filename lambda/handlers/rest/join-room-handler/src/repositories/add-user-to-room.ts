import { PutItemCommand, PutItemCommandInput } from "@aws-sdk/client-dynamodb";

import { DYNAMO_TABLE_NAME } from "@oigamez/configuration";
import {
  dbClient,
  dynamoFieldNames,
  dynamoFieldValues,
  expressions,
} from "@oigamez/dynamodb";

export const addUserToRoom = async (
  roomCode: string,
  username: string,
  ttl: number
): Promise<void> => {
  const putItemCommandInput: PutItemCommandInput = {
    TableName: DYNAMO_TABLE_NAME,
    Item: {
      [dynamoFieldNames.common.pk]: dynamoFieldValues.user.pk(roomCode),
      [dynamoFieldNames.common.sk]: dynamoFieldValues.user.sk(username),
      [dynamoFieldNames.user.username]:
        dynamoFieldValues.user.username(username),
      [dynamoFieldNames.common.ttl]: dynamoFieldValues.common.ttl(ttl),
      [dynamoFieldNames.common.type]: dynamoFieldValues.user.type,
    },
    ConditionExpression: expressions.common.keysDoNotExists,
  };

  const putItemCommand = new PutItemCommand(putItemCommandInput);

  await dbClient.send(putItemCommand);
};

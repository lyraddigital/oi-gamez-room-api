import { TransactWriteItem } from "@aws-sdk/client-dynamodb";

import { DYNAMO_TABLE_NAME } from "@oigamez/configuration";
import {
  dynamoFieldNames,
  dynamoFieldValues,
  expressions,
} from "@oigamez/dynamodb";
import { Room } from "@oigamez/models";

export const updateUserTTL = (
  room: Room,
  username: string,
  ttl: number
): TransactWriteItem => {
  return {
    Update: {
      TableName: DYNAMO_TABLE_NAME,
      Key: {
        [dynamoFieldNames.common.pk]: dynamoFieldValues.user.pk(room.code),
        [dynamoFieldNames.common.sk]: dynamoFieldValues.user.sk(username),
      },
      UpdateExpression: "SET #ttl = :ttl",
      ConditionExpression: expressions.common.keysExists,
      ExpressionAttributeNames: {
        "#ttl": dynamoFieldNames.common.ttl,
      },
      ExpressionAttributeValues: {
        ":ttl": dynamoFieldValues.common.ttl(ttl),
      },
    },
  };
};

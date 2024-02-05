import { TransactWriteItem } from "@aws-sdk/client-dynamodb";

import { DYNAMO_TABLE_NAME } from "@oigamez/configuration";
import {
  dynamoFieldNames,
  dynamoFieldValues,
  expressions,
  keys,
} from "@oigamez/dynamodb";
import { Room } from "@oigamez/models";

export const updateRoomHostDetails = (
  room: Room,
  ttl: number
): TransactWriteItem => {
  return {
    Update: {
      TableName: DYNAMO_TABLE_NAME,
      Key: keys.room(room.code),
      UpdateExpression: "SET #ttl = :ttl, #curNumOfUsers = :curNumOfUsers",
      ConditionExpression: expressions.common.keysExists,
      ExpressionAttributeNames: {
        "#ttl": dynamoFieldNames.common.ttl,
        "#curNumOfUsers": dynamoFieldNames.room.curNumOfUsers,
      },
      ExpressionAttributeValues: {
        ":ttl": dynamoFieldValues.common.ttl(ttl),
        ":curNumOfUsers": dynamoFieldValues.room.curNumOfUsers(1),
      },
    },
  };
};

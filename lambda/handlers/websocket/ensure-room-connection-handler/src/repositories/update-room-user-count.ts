import { TransactWriteItem } from "@aws-sdk/client-dynamodb";

import { DYNAMO_TABLE_NAME } from "@oigamez/configuration";
import {
  dynamoFieldNames,
  dynamoFieldValues,
  expressions,
} from "@oigamez/dynamodb";
import { Room } from "@oigamez/models";

export const updateRoomUserCount = (room: Room): TransactWriteItem => {
  return {
    Update: {
      TableName: DYNAMO_TABLE_NAME,
      Key: {
        [dynamoFieldNames.common.pk]: dynamoFieldValues.room.pk(room.code),
        [dynamoFieldNames.common.sk]: dynamoFieldValues.room.sk,
      },
      UpdateExpression: "ADD #curNumOfUsers :curNumOfUsers",
      ConditionExpression: expressions.common.keysExists,
      ExpressionAttributeNames: {
        "#curNumOfUsers": dynamoFieldNames.room.curNumOfUsers,
      },
      ExpressionAttributeValues: {
        ":curNumOfUsers": dynamoFieldValues.room.curNumOfUsers(1),
      },
    },
  };
};

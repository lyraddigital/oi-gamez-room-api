import { TransactWriteItem } from "@aws-sdk/client-dynamodb";

import { DYNAMO_TABLE_NAME } from "@oigamez/configuration";
import {
  dynamoFieldNames,
  dynamoFieldValues,
  expressions,
  keys,
} from "@oigamez/dynamodb";
import { Room } from "@oigamez/models";

export const updateRoomUserCount = (
  room: Room,
  userIncrement: number
): TransactWriteItem => {
  const isVisible =
    room.isPublic && room.curNumOfUsers + userIncrement < room.maxNumOfUsers;

  return {
    Update: {
      TableName: DYNAMO_TABLE_NAME,
      Key: keys.room(room.code),
      UpdateExpression:
        "ADD #curNumOfUsers :curNumOfUsers, SET #isVisible = :isVisible",
      ConditionExpression: expressions.common.keysExists,
      ExpressionAttributeNames: {
        "#curNumOfUsers": dynamoFieldNames.room.curNumOfUsers,
        "#isVisible": dynamoFieldNames.room.isVisible,
      },
      ExpressionAttributeValues: {
        ":curNumOfUsers": dynamoFieldValues.room.curNumOfUsers(userIncrement),
        ":isVisible": dynamoFieldValues.room.isVisible(isVisible),
      },
    },
  };
};

import { TransactWriteItem } from "@aws-sdk/client-dynamodb";

import { DYNAMO_TABLE_NAME } from "@oigamez/configuration";
import {
  dynamoFieldNames,
  dynamoFieldValues,
  expressions,
  keys,
} from "@oigamez/dynamodb";

export const updateRoomUserCount = (
  roomCode: string,
  userIncrement: number
): TransactWriteItem => {
  return {
    Update: {
      TableName: DYNAMO_TABLE_NAME,
      Key: keys.room(roomCode),
      UpdateExpression: "ADD #curNumOfUsers :curNumOfUsers",
      ConditionExpression: expressions.common.keysExists,
      ExpressionAttributeNames: {
        "#curNumOfUsers": dynamoFieldNames.room.curNumOfUsers,
      },
      ExpressionAttributeValues: {
        ":curNumOfUsers": dynamoFieldValues.room.curNumOfUsers(userIncrement),
      },
    },
  };
};

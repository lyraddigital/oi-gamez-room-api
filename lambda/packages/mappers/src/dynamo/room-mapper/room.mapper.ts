import { AttributeValue } from "@aws-sdk/client-dynamodb";
import {
  dynamoFieldNames,
  getDynamoBoolean,
  getDynamoInt,
  getDynamoString,
} from "@oigamez/dynamodb";
import { Room, RoomStatus } from "@oigamez/models";

export const mapFromDynamoToRoom = (
  dynamoRecord: Record<string, AttributeValue>
): Room => {
  return {
    title: getDynamoString(dynamoRecord[dynamoFieldNames.room.title]),
    hostUsername: getDynamoString(
      dynamoRecord[dynamoFieldNames.room.hostUsername]
    ),
    isPublic: getDynamoBoolean(dynamoRecord[dynamoFieldNames.room.visibility]),
    code: getDynamoString(dynamoRecord[dynamoFieldNames.room.code]),
    curNumOfUsers: getDynamoInt(
      dynamoRecord[dynamoFieldNames.room.curNumOfUsers]
    ),
    epochExpiry: getDynamoInt(dynamoRecord[dynamoFieldNames.common.ttl]),
    minNumOfUsers: getDynamoInt(
      dynamoRecord[dynamoFieldNames.room.minNumOfUsers]
    ),
    maxNumOfUsers: getDynamoInt(
      dynamoRecord[dynamoFieldNames.room.maxNumOfUsers]
    ),
    status: getDynamoString(
      dynamoRecord[dynamoFieldNames.room.status]
    ) as RoomStatus,
    gameTypeId: getDynamoInt(dynamoRecord[dynamoFieldNames.room.gameTypeId]),
  };
};

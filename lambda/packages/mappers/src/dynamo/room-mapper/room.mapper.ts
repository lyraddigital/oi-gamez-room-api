import { AttributeValue } from "@aws-sdk/client-dynamodb";
import {
  dynamoFieldNames,
  getDynamoBoolean,
  getDynamoInt,
  getDynamoString,
} from "@oigamez/dynamodb";
import { Room, RoomStatus, RoomVisiblityType } from "@oigamez/models";

export const mapFromDynamoToRoom = (
  dynamoRecord: Record<string, AttributeValue>
): Room => {
  return {
    title: getDynamoString(dynamoRecord[dynamoFieldNames.room.title]),
    hostUsername: getDynamoString(
      dynamoRecord[dynamoFieldNames.room.hostUsername]
    ),
    isPublic: getDynamoBoolean(dynamoRecord[dynamoFieldNames.room.isPublic]),
    visibilityType: getDynamoString(
      dynamoRecord[dynamoFieldNames.room.visibilityType]
    ) as RoomVisiblityType,
    code: getDynamoString(dynamoRecord[dynamoFieldNames.room.code]),
    createdAt: new Date(
      getDynamoString(dynamoRecord[dynamoFieldNames.room.curNumOfUsers])
    ),
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

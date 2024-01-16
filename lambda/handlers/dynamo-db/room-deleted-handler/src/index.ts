import { DynamoDBStreamEvent } from "aws-lambda";
import { RecordType, dynamoFieldNames } from "@oigamez/dynamodb";

import { removeRoomDataForCode } from "./repositories";

export const handler = async (
  dynamoEvent: DynamoDBStreamEvent
): Promise<void> => {
  for (let record of dynamoEvent.Records) {
    if (record.eventName === "REMOVE") {
      const isRoom =
        record.dynamodb?.OldImage &&
        record.dynamodb.OldImage[dynamoFieldNames.common.type]?.S ==
          RecordType.room;

      const roomCode = record.dynamodb?.OldImage
        ? record.dynamodb.OldImage[dynamoFieldNames.room.code]?.S || ""
        : "";
      const hasRoomCode = !!roomCode;

      if (isRoom && hasRoomCode) {
        await removeRoomDataForCode(roomCode);
      }
    }
  }
};

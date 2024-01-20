import {
  AttributeValue,
  BatchGetItemCommand,
  BatchGetItemCommandInput,
} from "@aws-sdk/client-dynamodb";
import { DYNAMO_TABLE_NAME } from "@oigamez/configuration";
import {
  dbClient,
  dynamoFieldNames,
  dynamoFieldValues,
  DYNAMO_GET_ITEMS_PER_PAGE,
} from "@oigamez/dynamodb";
import { mapFromDynamoToRoom } from "@oigamez/mappers";
import { Room } from "@oigamez/models";

const getRooms = async (
  roomGetEntries: Record<string, AttributeValue>[]
): Promise<Room[]> => {
  const batchGetItemCommandInput: BatchGetItemCommandInput = {
    RequestItems: {
      [DYNAMO_TABLE_NAME!]: {
        Keys: roomGetEntries,
      },
    },
  };

  const batchGetItemCommand = new BatchGetItemCommand(batchGetItemCommandInput);
  const response = await dbClient.send(batchGetItemCommand);

  if (!response?.Responses || !response?.Responses[DYNAMO_TABLE_NAME!]) {
    return [];
  }

  return response.Responses![DYNAMO_TABLE_NAME!].map(mapFromDynamoToRoom);
};

export const getAvailableRoomsByCodes = async (
  roomCodes: string[]
): Promise<Room[]> => {
  const roomGetEntries = roomCodes.map<Record<string, AttributeValue>>(
    (rc) => ({
      [dynamoFieldNames.common.pk]: dynamoFieldValues.room.pk(rc),
      [dynamoFieldNames.common.sk]: dynamoFieldValues.room.sk,
    })
  );
  const rooms: Room[] = [];
  const numberOfRequests = Math.ceil(
    roomCodes.length / DYNAMO_GET_ITEMS_PER_PAGE
  );

  for (let i = 0; i < numberOfRequests; i++) {
    const startIndex = i * DYNAMO_GET_ITEMS_PER_PAGE;
    const endIndex = startIndex + DYNAMO_GET_ITEMS_PER_PAGE;
    const pagedRooms = await getRooms(
      roomGetEntries.slice(startIndex, endIndex)
    );

    rooms.push(...pagedRooms);
  }

  return rooms;
};

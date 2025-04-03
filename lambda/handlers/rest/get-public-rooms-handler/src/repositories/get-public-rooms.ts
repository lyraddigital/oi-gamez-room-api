import { QueryCommand, QueryCommandInput } from "@aws-sdk/client-dynamodb";

import { DYNAMO_TABLE_NAME, RoomVisiblityType } from "/opt/nodejs/oigamez-core";
import {
  dbClient,
  dynamoFieldNames,
  dynamoFieldValues,
} from "/opt/nodejs/oigamez-data";

import {
  PUBLIC_ROOMS_TO_RETRIEVE,
  VISIBLE_ROOM_INDEX_NAME,
} from "../configuration";
import { PublicRoom } from "../models";
import { mapFromDynamoToPublicRoom } from "../mappers";

export const getPublicRooms = async (): Promise<PublicRoom[]> => {
  const queryCommandInput: QueryCommandInput = {
    TableName: DYNAMO_TABLE_NAME,
    IndexName: VISIBLE_ROOM_INDEX_NAME,
    KeyConditionExpression: "#visibilityType = :visibilityType",
    ExpressionAttributeNames: {
      "#visibilityType": dynamoFieldNames.room.visibilityType,
    },
    ExpressionAttributeValues: {
      ":visibilityType": dynamoFieldValues.room.visibilityType(
        RoomVisiblityType.visible
      ),
    },
    Limit: PUBLIC_ROOMS_TO_RETRIEVE,
  };

  const command = new QueryCommand(queryCommandInput);
  const response = await dbClient.send(command);

  if (!response?.Items?.length) {
    return [];
  }

  return response.Items.map(mapFromDynamoToPublicRoom);
};

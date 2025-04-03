import { QueryCommand, QueryCommandInput } from "@aws-sdk/client-dynamodb";
import { mapFromDynamoToConnection } from "@oigamez/mappers";

import {
  CONNECTION_DYNAMO_TABLE_NAME,
  RoomConnection,
} from "/opt/nodejs/oigamez-core";
import {
  dbClient,
  dynamoFieldNames,
  dynamoFieldValues,
} from "/opt/nodejs/oigamez-data";

import { CONNECTION_DYNAMO_INDEX_NAME } from "../configuration";

export const getConnectionById = async (
  connectionId: string
): Promise<RoomConnection | undefined> => {
  const queryCommandInput: QueryCommandInput = {
    TableName: CONNECTION_DYNAMO_TABLE_NAME,
    IndexName: CONNECTION_DYNAMO_INDEX_NAME,
    KeyConditionExpression: "#connectionId = :connectionId",
    ExpressionAttributeNames: {
      "#connectionId": dynamoFieldNames.connection.connectionId,
    },
    ExpressionAttributeValues: {
      ":connectionId": dynamoFieldValues.connection.connectionId(connectionId),
    },
  };

  const queryCommand = new QueryCommand(queryCommandInput);
  const response = await dbClient.send(queryCommand);

  if (!response?.Items || response.Items.length <= 0) {
    return undefined;
  }

  return mapFromDynamoToConnection(response.Items![0]);
};

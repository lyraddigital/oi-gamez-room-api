import { QueryCommand, QueryCommandInput } from "@aws-sdk/client-dynamodb";

import {
  CONNECTION_DYNAMO_INDEX_NAME,
  CONNECTION_DYNAMO_TABLE_NAME,
} from "@oigamez/configuration";
import {
  dbClient,
  dynamoFieldNames,
  dynamoFieldValues,
} from "@oigamez/dynamodb";

import { RoomConnection } from "../models";
import { mapFromDynamoToConnection } from "../mappers";

export const getConnectionById = async (
  connectionId: string,
  ttl: number
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

  if (response?.Items && response.Items.length <= 0) {
    return undefined;
  }

  return mapFromDynamoToConnection(response.Items![0]);
};

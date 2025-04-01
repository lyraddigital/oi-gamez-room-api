import { GetItemCommand, GetItemCommandInput } from "@aws-sdk/client-dynamodb";

import { CONNECTION_DYNAMO_TABLE_NAME } from "/opt/nodejs/oigamez-core";
import { dbClient, keys } from "@oigamez/dynamodb";
import { mapFromDynamoToConnection } from "@oigamez/mappers";
import { RoomConnection } from "/opt/nodejs/oigamez-core";

export const getRoomConnection = async (
  roomCode: string,
  username: string
): Promise<RoomConnection | undefined> => {
  const getItemCommandInput: GetItemCommandInput = {
    TableName: CONNECTION_DYNAMO_TABLE_NAME,
    Key: keys.connection(roomCode, username),
  };

  const getItemCommand = new GetItemCommand(getItemCommandInput);
  const response = await dbClient.send(getItemCommand);

  if (!response?.Item) {
    return undefined;
  }

  return mapFromDynamoToConnection(response.Item);
};

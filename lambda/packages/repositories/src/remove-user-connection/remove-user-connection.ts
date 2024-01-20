import {
  DeleteItemCommand,
  DeleteItemCommandInput,
} from "@aws-sdk/client-dynamodb";

import { CONNECTION_DYNAMO_TABLE_NAME } from "@oigamez/configuration";
import { dbClient, keys } from "@oigamez/dynamodb";

export const removeUserConnection = async (
  roomCode: string,
  username: string
): Promise<void> => {
  const deleteItemCommandInput: DeleteItemCommandInput = {
    TableName: CONNECTION_DYNAMO_TABLE_NAME,
    Key: keys.connection(roomCode, username),
  };

  const deleteItemCommand = new DeleteItemCommand(deleteItemCommandInput);

  await dbClient.send(deleteItemCommand);
};

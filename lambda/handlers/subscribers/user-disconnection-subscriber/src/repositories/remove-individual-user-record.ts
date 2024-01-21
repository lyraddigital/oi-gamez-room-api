import {
  DeleteItemCommand,
  DeleteItemCommandInput,
} from "@aws-sdk/client-dynamodb";

import { DYNAMO_TABLE_NAME } from "@oigamez/configuration";
import { dbClient, keys } from "@oigamez/dynamodb";

export const removeIndividualUserRecord = async (
  roomCode: string,
  username: string
): Promise<void> => {
  const deleteItemCommandInput: DeleteItemCommandInput = {
    TableName: DYNAMO_TABLE_NAME,
    Key: keys.user(roomCode, username),
  };

  const deleteItemCommand = new DeleteItemCommand(deleteItemCommandInput);

  await dbClient.send(deleteItemCommand);
};

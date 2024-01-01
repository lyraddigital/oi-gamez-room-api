import { GetItemCommand, GetItemCommandInput } from "@aws-sdk/client-dynamodb";

import { DYNAMO_TABLE_NAME } from "@oigamez/configuration";
import { dbClient, dynamoFieldNames, keys } from "@oigamez/dynamodb";

import { RoomsExhaustedError } from "../../errors";

export const getUniqueRoomCode = async (
  divisionCode: string,
  groupCode: string
): Promise<[string, boolean]> => {
  const getItemInput: GetItemCommandInput = {
    TableName: DYNAMO_TABLE_NAME,
    Key: keys.availableDivisionCodes(divisionCode, groupCode),
  };

  const command = new GetItemCommand(getItemInput);
  const response = await dbClient.send(command);
  const subCodeSet: string[] = !!response.Item
    ? response.Item[dynamoFieldNames.availableDivisionCodes.subCodes]?.SS || []
    : [];
  const subCodeSetLength = subCodeSet.length;

  if (subCodeSetLength == 0) {
    throw new RoomsExhaustedError(
      `We have no room codes left to allocate to a room of division code ${divisionCode} and group code ${groupCode}.`
    );
  }

  const subCode = subCodeSet[Math.floor(Math.random() * subCodeSetLength)];
  const roomCode = `${divisionCode}${groupCode}${subCode}`;

  return [roomCode, subCodeSet.length <= 1];
};

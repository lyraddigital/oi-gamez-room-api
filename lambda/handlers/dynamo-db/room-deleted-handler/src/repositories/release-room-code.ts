import {
  TransactWriteItem,
  TransactWriteItemsCommand,
  TransactWriteItemsCommandInput,
} from "@aws-sdk/client-dynamodb";

import { DYNAMO_TABLE_NAME } from "/opt/nodejs/oigamez-core";
import {
  dbClient,
  dynamoFieldNames,
  dynamoFieldValues,
  keys,
} from "@oigamez/dynamodb";

const reAddAvailableDivisionSubCode = (
  divisionCode: string,
  groupCode: string,
  subCodes: string
): TransactWriteItem => {
  return {
    Update: {
      TableName: DYNAMO_TABLE_NAME,
      Key: keys.availableDivisionCodes(divisionCode, groupCode),
      UpdateExpression: "ADD #subCodes :subCodes",
      ExpressionAttributeNames: {
        "#subCodes": dynamoFieldNames.availableDivisionCodes.subCodes,
      },
      ExpressionAttributeValues: {
        ":subCodes": dynamoFieldValues.availableDivisionCodes.subCodes([
          subCodes,
        ]),
      },
    },
  };
};

const deleteUnavailableDivisionAndGroupCode = (
  divisionCode: string,
  groupCode: string
): TransactWriteItem => {
  return {
    Delete: {
      TableName: DYNAMO_TABLE_NAME,
      Key: keys.unavailableDivisionCodes(`${divisionCode}${groupCode}`),
    },
  };
};

export const releaseRoomCode = async (roomCode: string): Promise<void> => {
  const divisionCode = roomCode[0];
  const groupCode = roomCode[1];
  const subCodes = roomCode.substring(2);

  const transactWriteItemsCommandInput: TransactWriteItemsCommandInput = {
    TransactItems: [
      reAddAvailableDivisionSubCode(divisionCode, groupCode, subCodes),
      deleteUnavailableDivisionAndGroupCode(divisionCode, groupCode),
    ],
  };

  const transactWriteItemsCommand = new TransactWriteItemsCommand(
    transactWriteItemsCommandInput
  );

  await dbClient.send(transactWriteItemsCommand);
};

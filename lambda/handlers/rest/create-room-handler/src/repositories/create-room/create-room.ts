import {
  TransactWriteItem,
  TransactWriteItemsCommand,
  TransactWriteItemsCommandInput,
} from "@aws-sdk/client-dynamodb";

import { DYNAMO_TABLE_NAME } from "@oigamez/configuration";
import {
  dbClient,
  dynamoFieldNames,
  dynamoFieldValues,
  expressions,
  keys,
} from "@oigamez/dynamodb";
import { RoomStatus } from "@oigamez/models";

import { RoomToCreate } from "../../models";

const createNewRoomEntry = (roomToCreate: RoomToCreate): TransactWriteItem => ({
  Put: {
    TableName: DYNAMO_TABLE_NAME,
    Item: {
      [dynamoFieldNames.common.pk]: dynamoFieldValues.room.pk(
        roomToCreate.code
      ),
      [dynamoFieldNames.common.sk]: dynamoFieldValues.room.sk,
      [dynamoFieldNames.room.code]: dynamoFieldValues.room.code(
        roomToCreate.code
      ),
      [dynamoFieldNames.room.title]: dynamoFieldValues.room.title(
        roomToCreate.title
      ),
      [dynamoFieldNames.room.hostUsername]: dynamoFieldValues.room.hostUsername(
        roomToCreate.hostUsername
      ),
      [dynamoFieldNames.room.visibility]: dynamoFieldValues.room.visibility(
        roomToCreate.isPublic
      ),
      [dynamoFieldNames.room.status]: dynamoFieldValues.room.status(
        RoomStatus.NotAvailable
      ),
      [dynamoFieldNames.common.ttl]: dynamoFieldValues.common.ttl(
        roomToCreate.epochExpiry
      ),
    },
    ConditionExpression: expressions.common.keysDoNotExists,
  },
});

const createNewUserEntry = (roomToCreate: RoomToCreate): TransactWriteItem => ({
  Put: {
    TableName: DYNAMO_TABLE_NAME,
    Item: {
      [dynamoFieldNames.common.pk]: dynamoFieldValues.user.pk(
        roomToCreate.code
      ),
      [dynamoFieldNames.common.sk]: dynamoFieldValues.user.sk(
        roomToCreate.hostUsername
      ),
      [dynamoFieldNames.user.username]: dynamoFieldValues.user.username(
        roomToCreate.hostUsername
      ),
      [dynamoFieldNames.common.ttl]: dynamoFieldValues.common.ttl(
        roomToCreate.epochExpiry
      ),
    },
    ConditionExpression: expressions.common.keysDoNotExists,
  },
});

const createRoomAvailabilityUpdateEntry = (
  divisionRoomCode: string,
  groupRoomCode: string,
  roomSubCode: string
): TransactWriteItem => ({
  Update: {
    TableName: DYNAMO_TABLE_NAME,
    Key: keys.availableDivisionCodes(divisionRoomCode, groupRoomCode),
    UpdateExpression: "DELETE #subcodes :roomSubCode",
    ConditionExpression: expressions.common.keysExists,
    ExpressionAttributeNames: {
      "#subcodes": dynamoFieldNames.availableDivisionCodes.subCodes,
    },
    ExpressionAttributeValues: {
      ":roomSubCode": dynamoFieldValues.availableDivisionCodes.subCodes([
        roomSubCode,
      ]),
    },
  },
});

const createRoomDivisionAndGroupUnavailableEntry = (
  roomDivisionAndGroupCode: string
): TransactWriteItem => ({
  Put: {
    TableName: DYNAMO_TABLE_NAME,
    Item: {
      [dynamoFieldNames.common.pk]: dynamoFieldValues.unavailableRoomCodes.pk,
      [dynamoFieldNames.common.sk]: dynamoFieldValues.unavailableRoomCodes.sk(
        roomDivisionAndGroupCode
      ),
    },
    ConditionExpression: expressions.common.keysDoNotExists,
  },
});

export const createRoom = async (
  roomToCreate: RoomToCreate,
  canSetDivisionAndGroupCodeAsUnavailable: boolean = false
): Promise<void> => {
  const roomCode = roomToCreate.code;
  const divisionRoomCode = roomCode[0];
  const groupRoomCode = roomCode[1];
  const roomSubCode = roomCode.substring(2);

  const transactionItems: TransactWriteItem[] = [
    createNewRoomEntry(roomToCreate),
    createNewUserEntry(roomToCreate),
    createRoomAvailabilityUpdateEntry(
      divisionRoomCode,
      groupRoomCode,
      roomSubCode
    ),
  ];

  if (canSetDivisionAndGroupCodeAsUnavailable) {
    transactionItems.push(
      createRoomDivisionAndGroupUnavailableEntry(
        `${divisionRoomCode}${groupRoomCode}`
      )
    );
  }

  const transactionWriteCommandInput: TransactWriteItemsCommandInput = {
    TransactItems: transactionItems,
  };

  const command = new TransactWriteItemsCommand(transactionWriteCommandInput);

  await dbClient.send(command);
};

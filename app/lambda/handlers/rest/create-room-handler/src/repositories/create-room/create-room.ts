import {
  TransactWriteItem,
  TransactWriteItemsCommand,
  TransactWriteItemsCommandInput,
} from "@aws-sdk/client-dynamodb";

import {
  DYNAMO_TABLE_NAME,
  RoomStatus,
  RoomVisiblityType,
} from "@oigamez/core";
import {
  dbClient,
  dynamoFieldNames,
  dynamoFieldValues,
  expressions,
  keys,
} from "@oigamez/data";

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
      [dynamoFieldNames.room.createdAt]: dynamoFieldValues.room.createdAt(
        roomToCreate.createdAt.toISOString()
      ),
      [dynamoFieldNames.room.title]: dynamoFieldValues.room.title(
        roomToCreate.title
      ),
      [dynamoFieldNames.room.hostUsername]: dynamoFieldValues.room.hostUsername(
        roomToCreate.hostUsername
      ),
      [dynamoFieldNames.room.curNumOfUsers]:
        dynamoFieldValues.room.curNumOfUsers(0),
      [dynamoFieldNames.room.minNumOfUsers]:
        dynamoFieldValues.room.minNumOfUsers(roomToCreate.minNumOfUsers),
      [dynamoFieldNames.room.maxNumOfUsers]:
        dynamoFieldValues.room.maxNumOfUsers(roomToCreate.maxNumOfUsers),
      [dynamoFieldNames.room.isPublic]: dynamoFieldValues.room.isPublic(
        roomToCreate.isPublic
      ),
      [dynamoFieldNames.room.visibilityType]:
        dynamoFieldValues.room.visibilityType(RoomVisiblityType.hidden),
      [dynamoFieldNames.room.status]: dynamoFieldValues.room.status(
        RoomStatus.notAvailable
      ),
      [dynamoFieldNames.room.gameTypeId]: dynamoFieldValues.room.gameTypeId(
        roomToCreate.gameTypeId
      ),
      [dynamoFieldNames.common.ttl]: dynamoFieldValues.common.ttl(
        roomToCreate.epochExpiry
      ),
      [dynamoFieldNames.common.type]: dynamoFieldValues.room.type,
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
      [dynamoFieldNames.common.type]:
        dynamoFieldValues.unavailableRoomCodes.type,
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

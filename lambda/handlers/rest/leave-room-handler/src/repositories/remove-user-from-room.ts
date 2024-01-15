import {
  TransactWriteItem,
  TransactWriteItemsCommand,
  TransactWriteItemsCommandInput,
} from "@aws-sdk/client-dynamodb";

import {
  CONNECTION_DYNAMO_TABLE_NAME,
  DYNAMO_TABLE_NAME,
} from "@oigamez/configuration";
import {
  dbClient,
  dynamoFieldNames,
  dynamoFieldValues,
  expressions,
  keys,
} from "@oigamez/dynamodb";
import { Room, RoomStatus } from "@oigamez/models";

const removeUserConnection = (
  roomCode: string,
  username: string
): TransactWriteItem => {
  return {
    Delete: {
      TableName: CONNECTION_DYNAMO_TABLE_NAME,
      Key: keys.connection(roomCode, username),
    },
  };
};

const removeRoomUser = (
  roomCode: string,
  username: string
): TransactWriteItem => {
  return {
    Delete: {
      TableName: DYNAMO_TABLE_NAME,
      Key: keys.user(roomCode, username),
    },
  };
};

const removeRoom = (roomCode: string): TransactWriteItem => {
  return {
    Delete: {
      TableName: DYNAMO_TABLE_NAME,
      Key: keys.room(roomCode),
    },
  };
};

export const updateRoomUserCount = (roomCode: string): TransactWriteItem => {
  return {
    Update: {
      TableName: DYNAMO_TABLE_NAME,
      Key: keys.room(roomCode),
      UpdateExpression: "ADD #curNumOfUsers :curNumOfUsers",
      ConditionExpression: expressions.common.keysExists,
      ExpressionAttributeNames: {
        "#curNumOfUsers": dynamoFieldNames.room.curNumOfUsers,
      },
      ExpressionAttributeValues: {
        ":curNumOfUsers": dynamoFieldValues.room.curNumOfUsers(-1),
      },
    },
  };
};

const releaseRoomCode = (roomCode: string): TransactWriteItem[] => {
  const divisionCode = roomCode[0];
  const groupCode = roomCode[1];
  const subCodes = roomCode.substring(2);

  const reAddAvailableRoomCodeTransactWriteItem: TransactWriteItem = {
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

  const deleteUnAvailableDivisionAndGroupCodeTransactWriteItem: TransactWriteItem =
    {
      Delete: {
        TableName: DYNAMO_TABLE_NAME,
        Key: keys.unavailableDivisionCodes(`${divisionCode}${groupCode}`),
      },
    };

  return [
    reAddAvailableRoomCodeTransactWriteItem,
    deleteUnAvailableDivisionAndGroupCodeTransactWriteItem,
  ];
};

export const removeUserFromRoom = async (
  room: Room,
  username: string
): Promise<void> => {
  const transactWriteItems: TransactWriteItem[] = [
    removeUserConnection(room.code, username),
  ];

  if (room.status === RoomStatus.Available) {
    transactWriteItems.push(removeRoomUser(room.code, username));

    if (room.hostUsername === username) {
      transactWriteItems.push(removeRoom(room.code));
      transactWriteItems.push(...releaseRoomCode(room.code));
    } else {
      transactWriteItems.push(updateRoomUserCount(room.code));
    }
  }

  const transactWriteItemsCommandInput: TransactWriteItemsCommandInput = {
    TransactItems: transactWriteItems,
  };

  const putItemCommand = new TransactWriteItemsCommand(
    transactWriteItemsCommandInput
  );

  await dbClient.send(putItemCommand);
};

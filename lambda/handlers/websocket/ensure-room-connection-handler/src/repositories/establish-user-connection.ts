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
} from "@oigamez/dynamodb";
import { Room, RoomStatus } from "@oigamez/models";

const createOrUpdateRoomConnection = (
  room: Room,
  username: string,
  connectionId: string,
  ttl: number
): TransactWriteItem => {
  return {
    Put: {
      TableName: CONNECTION_DYNAMO_TABLE_NAME,
      Item: {
        [dynamoFieldNames.connection.pk]: dynamoFieldValues.connection.pk(
          room.code
        ),
        [dynamoFieldNames.connection.sk]:
          dynamoFieldValues.connection.sk(username),
        [dynamoFieldNames.connection.username]:
          dynamoFieldValues.connection.username(username),
        [dynamoFieldNames.connection.connectionId]:
          dynamoFieldValues.connection.connectionId(connectionId),
        [dynamoFieldNames.connection.ttl]:
          dynamoFieldValues.connection.ttl(ttl),
      },
    },
  };
};

const updateUserTTL = (
  room: Room,
  username: string,
  ttl: number
): TransactWriteItem => {
  return {
    Update: {
      TableName: DYNAMO_TABLE_NAME,
      Key: {
        [dynamoFieldNames.common.pk]: dynamoFieldValues.user.pk(room.code),
        [dynamoFieldNames.common.sk]: dynamoFieldValues.user.sk(username),
      },
      UpdateExpression: "SET #ttl = :ttl",
      ConditionExpression: expressions.common.keysExists,
      ExpressionAttributeNames: {
        "#ttl": dynamoFieldNames.common.ttl,
      },
      ExpressionAttributeValues: {
        ":ttl": dynamoFieldValues.common.ttl(ttl),
      },
    },
  };
};

const updateRoomHostDetails = (room: Room, ttl: number): TransactWriteItem => {
  return {
    Update: {
      TableName: DYNAMO_TABLE_NAME,
      Key: {
        [dynamoFieldNames.common.pk]: dynamoFieldValues.room.pk(room.code),
        [dynamoFieldNames.common.sk]: dynamoFieldValues.room.sk,
      },
      UpdateExpression:
        "SET #ttl = :ttl, #status = :status, #curNumOfUsers = :curNumOfUsers",
      ConditionExpression: expressions.common.keysExists,
      ExpressionAttributeNames: {
        "#ttl": dynamoFieldNames.common.ttl,
        "#status": dynamoFieldNames.room.status,
        "#curNumOfUsers": dynamoFieldNames.room.curNumOfUsers,
      },
      ExpressionAttributeValues: {
        ":ttl": dynamoFieldValues.common.ttl(ttl),
        ":status": dynamoFieldValues.room.status(RoomStatus.Available),
        ":curNumOfUsers": dynamoFieldValues.room.curNumOfUsers(1),
      },
    },
  };
};

export const establishUserConnection = async (
  room: Room,
  username: string,
  isHost: boolean,
  connectionId: string,
  ttlInConnectionWindow: boolean,
  updatedTTL: number
): Promise<void> => {
  const transactionWriteItems: TransactWriteItem[] = [
    createOrUpdateRoomConnection(room, username, connectionId, updatedTTL),
  ];

  if (ttlInConnectionWindow) {
    transactionWriteItems.push(updateUserTTL(room, username, updatedTTL));

    if (isHost) {
      transactionWriteItems.push(updateRoomHostDetails(room, updatedTTL));
    }
  }

  const transactWriteItemsCommandInput: TransactWriteItemsCommandInput = {
    TransactItems: transactionWriteItems,
  };

  const command = new TransactWriteItemsCommand(transactWriteItemsCommandInput);

  await dbClient.send(command);
};

import {
  DynamoDBClient,
  TransactWriteItemsCommand,
} from "@aws-sdk/client-dynamodb";

import { Room } from "@oigamez/core";
import { dbClient } from "../../dynamodb/index.js";
import { removeUserFromRoom } from "./remove-user-from-room.js";

jest.mock("@oigamez/core", () => {
  return {
    ...jest.requireActual("@oigamez/core"),
    DYNAMO_TABLE_NAME: "SomeTable",
    CONNECTION_DYNAMO_TABLE_NAME: "SomeConnectionTable",
  };
});

describe("removeUserFromRoom tests", () => {
  const sendSpy = jest.spyOn<DynamoDBClient, "send">(dbClient, "send");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("makes the correct get to dynamo db transaction write", async () => {
    // Arrange
    const roomCode = "ABCD";
    const username = "daryl_duck";
    const room: Room = {
      code: roomCode,
      isPublic: true,
      curNumOfUsers: 3,
      maxNumOfUsers: 4,
    } as Room;

    sendSpy.mockReturnValueOnce({} as any);

    // Action
    await removeUserFromRoom(room, username);

    // Assert
    expect(sendSpy.mock.calls.length).toBe(1);
    expect(
      (sendSpy.mock.calls[0][0] as TransactWriteItemsCommand).input
        .TransactItems
    ).toEqual([
      {
        Delete: {
          Key: {
            PK: {
              S: `Room#${roomCode}`,
            },
            SK: {
              S: `#User#${username}`,
            },
          },
          TableName: "SomeConnectionTable",
        },
      },
      {
        Update: {
          Key: {
            PK: {
              S: `Room#${roomCode}`,
            },
            SK: {
              S: `#Metadata`,
            },
          },
          ConditionExpression: "attribute_exists(PK) AND attribute_exists(SK)",
          ExpressionAttributeNames: {
            "#curNumOfUsers": "CurNumberOfUsers",
            "#visibilityType": "VisibilityType",
          },
          ExpressionAttributeValues: {
            ":curNumOfUsers": {
              N: "-1",
            },
            ":visibilityType": {
              S: "visible",
            },
          },
          UpdateExpression:
            "ADD #curNumOfUsers :curNumOfUsers SET #visibilityType = :visibilityType",
          TableName: "SomeTable",
        },
      },
    ]);
  });

  test("updates the visibility of the room to hidden if isPublic is false", async () => {
    // Arrange
    const roomCode = "ABCD";
    const username = "daryl_duck";
    const room: Room = {
      code: roomCode,
      isPublic: false,
      curNumOfUsers: 3,
      maxNumOfUsers: 4,
    } as Room;

    sendSpy.mockReturnValueOnce({} as any);

    // Action
    await removeUserFromRoom(room, username);

    // Assert
    expect(sendSpy.mock.calls.length).toBe(1);
    expect(
      (sendSpy.mock.calls[0][0] as TransactWriteItemsCommand).input
        .TransactItems![1].Update!.ExpressionAttributeValues![
        ":visibilityType"
      ]!.S
    ).toEqual("hidden");
  });
});

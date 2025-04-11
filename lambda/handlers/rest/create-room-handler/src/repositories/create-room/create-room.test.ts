import {
  DynamoDBClient,
  TransactWriteItemsCommand,
} from "@aws-sdk/client-dynamodb";

import { dbClient } from "@oigamez/data";

import { RoomToCreate } from "../../models/index.js";
import { createRoom } from "./create-room.js";

jest.mock("@oigamez/core", () => {
  return {
    ...jest.requireActual("@oigamez/core"),
    DYNAMO_TABLE_NAME: "SomeTable",
    CONNECTION_DYNAMO_TABLE_NAME: "SomeConnectionTable",
  };
});

describe("createRoom tests", () => {
  const sendSpy = jest.spyOn<DynamoDBClient, "send">(dbClient, "send");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("makes the correct dynamo db transaction writes when we can not set the division and group code as unavailable", async () => {
    // Arrange
    const roomCode = "ABCD";
    const username = "daryl_duck";
    const roomToCreate: RoomToCreate = {
      code: roomCode,
      createdAt: new Date(),
      epochExpiry: 101020209393,
      title: "A Room",
      hostUsername: username,
      minNumOfUsers: 2,
      maxNumOfUsers: 4,
      isPublic: true,
      gameTypeId: 1,
    };

    sendSpy.mockReturnValueOnce({} as any);

    // Action
    await createRoom(roomToCreate);

    // Assert
    expect(sendSpy.mock.calls.length).toBe(1);
    expect(
      (sendSpy.mock.calls[0][0] as TransactWriteItemsCommand).input
        .TransactItems![0]
    ).toEqual({
      Put: {
        ConditionExpression:
          "attribute_not_exists(PK) AND attribute_not_exists(SK)",
        Item: {
          PK: {
            S: `Room#${roomToCreate.code}`,
          },
          SK: {
            S: "#Metadata",
          },
          CreatedAt: {
            S: roomToCreate.createdAt.toISOString(),
          },
          CurNumberOfUsers: {
            N: "0",
          },
          GameTypeId: {
            N: roomToCreate.gameTypeId.toString(),
          },
          HostUsername: {
            S: roomToCreate.hostUsername,
          },
          IsPublic: {
            BOOL: roomToCreate.isPublic,
          },
          MaxNumberOfUsers: {
            N: roomToCreate.maxNumOfUsers.toString(),
          },
          MinNumberOfUsers: {
            N: roomToCreate.minNumOfUsers.toString(),
          },
          RoomCode: {
            S: roomCode,
          },
          Status: {
            S: "not available",
          },
          TTL: {
            N: roomToCreate.epochExpiry.toString(),
          },
          Title: {
            S: roomToCreate.title,
          },
          Type: {
            S: "Room",
          },
          VisibilityType: {
            S: "hidden",
          },
        },
        TableName: "SomeTable",
      },
    });
    expect(
      (sendSpy.mock.calls[0][0] as TransactWriteItemsCommand).input
        .TransactItems![1]
    ).toEqual({
      Update: {
        TableName: "SomeTable",
        Key: {
          PK: { S: "AvailableDivisionCode#A" },
          SK: { S: "#GroupCode#B" },
        },
        UpdateExpression: "DELETE #subcodes :roomSubCode",
        ConditionExpression: "attribute_exists(PK) AND attribute_exists(SK)",
        ExpressionAttributeNames: {
          "#subcodes": "Subcodes",
        },
        ExpressionAttributeValues: {
          ":roomSubCode": {
            SS: ["CD"],
          },
        },
      },
    });
  });

  test("makes the correct dynamo db transaction writes when we can set the division and group code as unavailable", async () => {
    // Arrange
    const roomCode = "ABCD";
    const username = "daryl_duck";
    const roomToCreate: RoomToCreate = {
      code: roomCode,
      createdAt: new Date(),
      epochExpiry: 101020209393,
      title: "A Room",
      hostUsername: username,
      minNumOfUsers: 2,
      maxNumOfUsers: 4,
      isPublic: true,
      gameTypeId: 1,
    };

    sendSpy.mockReturnValueOnce({} as any);

    // Action
    await createRoom(roomToCreate, true);

    // Assert
    expect(sendSpy.mock.calls.length).toBe(1);
    expect(
      (sendSpy.mock.calls[0][0] as TransactWriteItemsCommand).input
        .TransactItems![0]
    ).toEqual({
      Put: {
        ConditionExpression:
          "attribute_not_exists(PK) AND attribute_not_exists(SK)",
        Item: {
          PK: {
            S: `Room#${roomToCreate.code}`,
          },
          SK: {
            S: "#Metadata",
          },
          CreatedAt: {
            S: roomToCreate.createdAt.toISOString(),
          },
          CurNumberOfUsers: {
            N: "0",
          },
          GameTypeId: {
            N: roomToCreate.gameTypeId.toString(),
          },
          HostUsername: {
            S: roomToCreate.hostUsername,
          },
          IsPublic: {
            BOOL: roomToCreate.isPublic,
          },
          MaxNumberOfUsers: {
            N: roomToCreate.maxNumOfUsers.toString(),
          },
          MinNumberOfUsers: {
            N: roomToCreate.minNumOfUsers.toString(),
          },
          RoomCode: {
            S: roomCode,
          },
          Status: {
            S: "not available",
          },
          TTL: {
            N: roomToCreate.epochExpiry.toString(),
          },
          Title: {
            S: roomToCreate.title,
          },
          Type: {
            S: "Room",
          },
          VisibilityType: {
            S: "hidden",
          },
        },
        TableName: "SomeTable",
      },
    });
    expect(
      (sendSpy.mock.calls[0][0] as TransactWriteItemsCommand).input
        .TransactItems![1]
    ).toEqual({
      Update: {
        TableName: "SomeTable",
        Key: {
          PK: { S: "AvailableDivisionCode#A" },
          SK: { S: "#GroupCode#B" },
        },
        UpdateExpression: "DELETE #subcodes :roomSubCode",
        ConditionExpression: "attribute_exists(PK) AND attribute_exists(SK)",
        ExpressionAttributeNames: {
          "#subcodes": "Subcodes",
        },
        ExpressionAttributeValues: {
          ":roomSubCode": {
            SS: ["CD"],
          },
        },
      },
    });
    expect(
      (sendSpy.mock.calls[0][0] as TransactWriteItemsCommand).input
        .TransactItems![2]
    ).toEqual({
      Put: {
        TableName: "SomeTable",
        Item: {
          PK: { S: "UnavailableDivisionAndGroupCodes" },
          SK: { S: "#AB" },
          Type: { S: "UnavailableRoomCode" },
        },
        ConditionExpression:
          "attribute_not_exists(PK) AND attribute_not_exists(SK)",
      },
    });
  });
});

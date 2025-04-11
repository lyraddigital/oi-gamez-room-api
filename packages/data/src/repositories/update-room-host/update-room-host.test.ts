import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

import { dbClient } from "../../dynamodb/index.js";
import { updateRoomHost } from "./update-room-host.js";

jest.mock("@oigamez/core", () => {
  return {
    DYNAMO_TABLE_NAME: "SomeTable",
  };
});

describe("updateRoomHost tests", () => {
  const sendSpy = jest.spyOn<DynamoDBClient, "send">(dbClient, "send");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("makes the correct update on dynamo db", async () => {
    // Arrange
    const roomCode = "ABCD";
    const username = "daryl_duck";

    sendSpy.mockReturnValueOnce({} as any);

    // Action
    await updateRoomHost(roomCode, username);

    // Assert
    expect(sendSpy.mock.calls.length).toBe(1);
    expect((sendSpy.mock.calls[0][0] as UpdateItemCommand).input).toEqual({
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
        "#hostUsername": "HostUsername",
      },
      ExpressionAttributeValues: {
        ":newHostUsername": {
          S: username,
        },
      },
      UpdateExpression: "SET #hostUsername = :newHostUsername",
      TableName: "SomeTable",
    });
  });
});

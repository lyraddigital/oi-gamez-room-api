import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

import { RoomStatus } from "/opt/nodejs/oigamez-core";
import { dbClient } from "../../dynamodb";
import { updateRoomStatus } from "./update-room-status";

jest.mock("/opt/nodejs/oigamez-core", () => {
  return {
    ...jest.requireActual("/opt/nodejs/oigamez-core"),
    DYNAMO_TABLE_NAME: "SomeTable",
  };
});

describe("updateRoomStatus tests", () => {
  const sendSpy = jest.spyOn<DynamoDBClient, "send">(dbClient, "send");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("makes the correct update on dynamo db", async () => {
    // Arrange
    const roomCode = "ABCD";

    sendSpy.mockReturnValueOnce({} as any);

    // Action
    await updateRoomStatus(roomCode, RoomStatus.inProgress);

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
        "#status": "Status",
      },
      ExpressionAttributeValues: {
        ":status": {
          S: "in progress",
        },
      },
      UpdateExpression: "SET #status = :status",
      TableName: "SomeTable",
    });
  });
});

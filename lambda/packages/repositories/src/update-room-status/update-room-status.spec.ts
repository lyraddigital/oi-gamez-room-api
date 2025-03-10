import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { dbClient } from "@oigamez/dynamodb";

import { updateRoomStatus } from "./update-room-status";
import { RoomStatus } from "@oigamez/models";

jest.mock("@oigamez/configuration", () => {
  return {
    DYNAMO_TABLE_NAME: "SomeTable",
  };
});

describe("updateRoomStatus tests", () => {
  const sendSpy = jest.spyOn<DynamoDBClient, "send">(dbClient, "send");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("makes the correct update on dynamo db", async () => {
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

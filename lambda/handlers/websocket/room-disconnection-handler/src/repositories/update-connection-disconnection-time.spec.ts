import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { dbClient } from "@oigamez/dynamodb";
import { RoomConnection } from "@oigamez/models";

import { updateConnectionDisconnectionTime } from "./update-connection-disconnection-time";

jest.mock("@oigamez/configuration", () => {
  return {
    CONNECTION_DYNAMO_TABLE_NAME: "SomeConnectionTable",
  };
});

describe("updateConnectionDisconnectionTime tests", () => {
  const sendSpy = jest.spyOn<DynamoDBClient, "send">(dbClient, "send");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("makes the correct query to dynamo db and returns mapped response", async () => {
    // Arrange
    const roomCode = "ABCD";
    const username = "daryl_duck";
    const ttl = 39403495;
    const connection = {
      roomCode,
      username,
    } as RoomConnection;

    sendSpy.mockReturnValueOnce();

    // Action
    await updateConnectionDisconnectionTime(connection, ttl);

    // Assert
    expect(sendSpy).toHaveBeenCalled();
    expect(
      (sendSpy.mock.calls[0][0] as UpdateItemCommand).input.TableName
    ).toBe("SomeConnectionTable");
    expect((sendSpy.mock.calls[0][0] as UpdateItemCommand).input.Key).toEqual({
      PK: { S: `Room#${roomCode}` },
      SK: { S: `#User#${username}` },
    });
    expect(
      (sendSpy.mock.calls[0][0] as UpdateItemCommand).input.UpdateExpression
    ).toBe("SET #lastDisconnected = :lastDisconnected");
    expect(
      (sendSpy.mock.calls[0][0] as UpdateItemCommand).input.ConditionExpression
    ).toBe("attribute_exists(PK) AND attribute_exists(SK)");
    expect(
      (sendSpy.mock.calls[0][0] as UpdateItemCommand).input
        .ExpressionAttributeNames
    ).toEqual({
      "#lastDisconnected": "LastDisconnected",
    });
    expect(
      (sendSpy.mock.calls[0][0] as UpdateItemCommand).input
        .ExpressionAttributeValues
    ).toEqual({
      ":lastDisconnected": { N: ttl.toString() },
    });
  });
});

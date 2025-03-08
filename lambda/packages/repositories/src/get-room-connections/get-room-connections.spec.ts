import {
  DynamoDBClient,
  QueryCommand,
  QueryCommandOutput,
} from "@aws-sdk/client-dynamodb";
import { dbClient } from "@oigamez/dynamodb";
import { mapFromDynamoToConnection } from "@oigamez/mappers";
import { RoomConnection } from "@oigamez/models";

import { getRoomConnections } from "./get-room-connections";

jest.mock("@oigamez/mappers");
jest.mock("@oigamez/configuration", () => {
  return {
    CONNECTION_DYNAMO_TABLE_NAME: "SomeTable",
  };
});

describe("getRoomConnections tests", () => {
  const sendSpy = jest.spyOn<DynamoDBClient, "send">(dbClient, "send");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("makes the correct query command to dynamo db and returns mapped responses when not using ttl", async () => {
    // Arrange
    const roomCode = "ABCD";
    const username = "daryl_duck";
    const connection: RoomConnection = {
      roomCode,
      username,
      connectionId: "conn292928338",
    };
    const getItemResponse: QueryCommandOutput = {
      Items: [{}],
      $metadata: {},
    };

    (
      mapFromDynamoToConnection as jest.MockedFunction<
        typeof mapFromDynamoToConnection
      >
    ).mockReturnValue(connection);

    sendSpy.mockReturnValueOnce(getItemResponse as any);

    // Action
    const results = await getRoomConnections(roomCode);

    // Assert
    expect(sendSpy.mock.calls.length).toBe(1);
    expect((sendSpy.mock.calls[0][0] as QueryCommand).input.TableName).toBe(
      "SomeTable"
    );
    expect(
      (sendSpy.mock.calls[0][0] as QueryCommand).input.KeyConditionExpression
    ).toBe("#pk = :pk");
    expect(
      (sendSpy.mock.calls[0][0] as QueryCommand).input.ExpressionAttributeNames
    ).toEqual({ "#pk": "PK" });
    expect(
      (sendSpy.mock.calls[0][0] as QueryCommand).input.ExpressionAttributeValues
    ).toEqual({ ":pk": { S: `Room#${roomCode}` } });
    expect(
      (sendSpy.mock.calls[0][0] as QueryCommand).input.FilterExpression
    ).toBeUndefined();
    expect(results.length).toBe(1);
    expect(results[0]).toEqual(connection);
  });

  it("makes the correct query command to dynamo db and returns mapped responses when using ttl", async () => {
    // Arrange
    const roomCode = "ABCD";
    const username = "daryl_duck";
    const ttl = 299328383;
    const connection: RoomConnection = {
      roomCode,
      username,
      connectionId: "conn292928338",
    };
    const getItemResponse: QueryCommandOutput = {
      Items: [{}],
      $metadata: {},
    };

    (
      mapFromDynamoToConnection as jest.MockedFunction<
        typeof mapFromDynamoToConnection
      >
    ).mockReturnValue(connection);

    sendSpy.mockReturnValueOnce(getItemResponse as any);

    // Action
    const results = await getRoomConnections(roomCode, ttl);

    // Assert
    expect(sendSpy.mock.calls.length).toBe(1);
    expect((sendSpy.mock.calls[0][0] as QueryCommand).input.TableName).toBe(
      "SomeTable"
    );
    expect(
      (sendSpy.mock.calls[0][0] as QueryCommand).input.KeyConditionExpression
    ).toBe("#pk = :pk");
    expect(
      (sendSpy.mock.calls[0][0] as QueryCommand).input.ExpressionAttributeNames
    ).toEqual({ "#pk": "PK", "#ttl": "TTL" });
    expect(
      (sendSpy.mock.calls[0][0] as QueryCommand).input.ExpressionAttributeValues
    ).toEqual({
      ":pk": { S: `Room#${roomCode}` },
      ":ttl": { N: ttl.toString() },
    });
    expect(
      (sendSpy.mock.calls[0][0] as QueryCommand).input.FilterExpression
    ).toBe("#ttl > :ttl");
    expect(results.length).toBe(1);
    expect(results[0]).toEqual(connection);
  });

  it("returns undefined if the get item command returns an no item", async () => {
    // Arrange
    const roomCode = "ABCD";
    const queryResponse: QueryCommandOutput = {
      Items: [],
      $metadata: {},
    };

    sendSpy.mockReturnValueOnce(queryResponse as any);

    // Action
    const results = await getRoomConnections(roomCode);

    // Assert
    expect(results.length).toBe(0);
  });
});

import {
  AttributeValue,
  DynamoDBClient,
  QueryCommand,
  QueryCommandOutput,
} from "@aws-sdk/client-dynamodb";

import { RoomConnection } from "@oigamez/core";
import { dbClient, mapFromDynamoToConnection } from "@oigamez/data";

import { getConnectionById } from "./get-connection-by-id.js";

jest.mock("@oigamez/core", () => {
  return {
    CONNECTION_DYNAMO_TABLE_NAME: "SomeConnectionTable",
  };
});
jest.mock("@oigamez/data", () => {
  return {
    ...jest.requireActual("@oigamez/data"),
    mapFromDynamoToConnection: jest.fn(),
  };
});
jest.mock("../configuration", () => {
  return {
    CONNECTION_DYNAMO_INDEX_NAME: "SomeConnectionIndex",
  };
});

describe("getRoomHostingData tests", () => {
  const sendSpy = jest.spyOn<DynamoDBClient, "send">(dbClient, "send");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("makes the correct query to dynamo db and returns mapped response", async () => {
    // Arrange
    const connectionId = "conn1234";
    const roomConnection = {} as RoomConnection;
    const item: Record<string, AttributeValue> = {};
    const queryResponse: QueryCommandOutput = {
      Items: [item],
      $metadata: {},
    };

    (
      mapFromDynamoToConnection as jest.MockedFunction<
        typeof mapFromDynamoToConnection
      >
    ).mockReturnValueOnce(roomConnection);
    sendSpy.mockReturnValueOnce(queryResponse as any);

    // Action
    const connection = await getConnectionById(connectionId);

    // Assert
    expect(connection).toBe(roomConnection);
    expect(sendSpy.mock.calls.length).toBe(1);
    expect((sendSpy.mock.calls[0][0] as QueryCommand).input.TableName).toBe(
      "SomeConnectionTable"
    );
    expect((sendSpy.mock.calls[0][0] as QueryCommand).input.IndexName).toBe(
      "SomeConnectionIndex"
    );
    expect(
      (sendSpy.mock.calls[0][0] as QueryCommand).input.KeyConditionExpression
    ).toBe("#connectionId = :connectionId");
    expect(
      (sendSpy.mock.calls[0][0] as QueryCommand).input.ExpressionAttributeNames
    ).toEqual({ "#connectionId": "ConnectionId" });
    expect(
      (sendSpy.mock.calls[0][0] as QueryCommand).input.ExpressionAttributeValues
    ).toEqual({ ":connectionId": { S: connectionId } });
    expect(mapFromDynamoToConnection).toHaveBeenCalledWith(item);
  });

  test("query returns no records, returns undefined", async () => {
    // Arrange
    const connectionId = "conn1234";
    const queryResponse: QueryCommandOutput = {
      Items: [],
      $metadata: {},
    };

    sendSpy.mockReturnValueOnce(queryResponse as any);

    // Action
    const connection = await getConnectionById(connectionId);

    // Assert
    expect(connection).toBeUndefined();
    expect(sendSpy.mock.calls.length).toBe(1);
    expect((sendSpy.mock.calls[0][0] as QueryCommand).input.TableName).toBe(
      "SomeConnectionTable"
    );
    expect((sendSpy.mock.calls[0][0] as QueryCommand).input.IndexName).toBe(
      "SomeConnectionIndex"
    );
    expect(
      (sendSpy.mock.calls[0][0] as QueryCommand).input.KeyConditionExpression
    ).toBe("#connectionId = :connectionId");
    expect(
      (sendSpy.mock.calls[0][0] as QueryCommand).input.ExpressionAttributeNames
    ).toEqual({ "#connectionId": "ConnectionId" });
    expect(
      (sendSpy.mock.calls[0][0] as QueryCommand).input.ExpressionAttributeValues
    ).toEqual({ ":connectionId": { S: connectionId } });
    expect(mapFromDynamoToConnection).not.toHaveBeenCalled();
  });

  test("query response items array is undefined, returns undefined", async () => {
    // Arrange
    const connectionId = "conn1234";
    const queryResponse: QueryCommandOutput = {
      $metadata: {},
    };

    sendSpy.mockReturnValueOnce(queryResponse as any);

    // Action
    const connection = await getConnectionById(connectionId);

    // Assert
    expect(connection).toBeUndefined();
    expect(sendSpy.mock.calls.length).toBe(1);
    expect((sendSpy.mock.calls[0][0] as QueryCommand).input.TableName).toBe(
      "SomeConnectionTable"
    );
    expect((sendSpy.mock.calls[0][0] as QueryCommand).input.IndexName).toBe(
      "SomeConnectionIndex"
    );
    expect(
      (sendSpy.mock.calls[0][0] as QueryCommand).input.KeyConditionExpression
    ).toBe("#connectionId = :connectionId");
    expect(
      (sendSpy.mock.calls[0][0] as QueryCommand).input.ExpressionAttributeNames
    ).toEqual({ "#connectionId": "ConnectionId" });
    expect(
      (sendSpy.mock.calls[0][0] as QueryCommand).input.ExpressionAttributeValues
    ).toEqual({ ":connectionId": { S: connectionId } });
    expect(mapFromDynamoToConnection).not.toHaveBeenCalled();
  });

  test("query response is undefined, returns undefined", async () => {
    // Arrange
    const connectionId = "conn1234";

    sendSpy.mockReturnValueOnce(undefined);

    // Action
    const connection = await getConnectionById(connectionId);

    // Assert
    expect(connection).toBeUndefined();
    expect(sendSpy.mock.calls.length).toBe(1);
    expect((sendSpy.mock.calls[0][0] as QueryCommand).input.TableName).toBe(
      "SomeConnectionTable"
    );
    expect((sendSpy.mock.calls[0][0] as QueryCommand).input.IndexName).toBe(
      "SomeConnectionIndex"
    );
    expect(
      (sendSpy.mock.calls[0][0] as QueryCommand).input.KeyConditionExpression
    ).toBe("#connectionId = :connectionId");
    expect(
      (sendSpy.mock.calls[0][0] as QueryCommand).input.ExpressionAttributeNames
    ).toEqual({ "#connectionId": "ConnectionId" });
    expect(
      (sendSpy.mock.calls[0][0] as QueryCommand).input.ExpressionAttributeValues
    ).toEqual({ ":connectionId": { S: connectionId } });
    expect(mapFromDynamoToConnection).not.toHaveBeenCalled();
  });
});

import {
  DynamoDBClient,
  ScanCommand,
  ScanCommandOutput,
} from "@aws-sdk/client-dynamodb";

import { RoomConnection } from "/opt/nodejs/oigamez-core.js";
import {
  dbClient,
  mapFromDynamoToConnection,
} from "/opt/nodejs/oigamez-data.js";
import { getAllExpiredConnections } from "./get-all-expired-connections.js";

jest.mock("/opt/nodejs/oigamez-core.js", () => {
  return {
    CONNECTION_DYNAMO_TABLE_NAME: "ConnectionTable",
  };
});
jest.mock("/opt/nodejs/oigamez-data.js", () => {
  return {
    ...jest.requireActual("/opt/nodejs/oigamez-data.js"),
    mapFromDynamoToConnection: jest.fn(),
  };
});
jest.mock("../configuration/index.js", () => {
  return {
    CONNECTION_DYNAMO_LAST_DISCONNECTED_INDEX_NAME: "LastDisconnectedIndex",
    EXPIRED_DISCONNECTION_WINDOW_IN_SECONDS: 30,
  };
});

describe("getAllExpiredConnections tests", () => {
  const sendSpy = jest.spyOn<DynamoDBClient, "send">(dbClient, "send");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("the scan command returns undefined, returns any empty array", async () => {
    // Arrange
    const currentTime = Math.floor(new Date().getTime());
    const expectNextLastDisconnectedExpiration = currentTime - 30;

    sendSpy.mockResolvedValueOnce(undefined as never);

    // Action
    const connections = await getAllExpiredConnections(currentTime);

    // Assert
    expect(connections).toHaveLength(0);
    expect(sendSpy).toHaveBeenCalled();
    expect((sendSpy.mock.calls[0][0] as ScanCommand).input.TableName).toBe(
      "ConnectionTable"
    );
    expect((sendSpy.mock.calls[0][0] as ScanCommand).input.IndexName).toBe(
      "LastDisconnectedIndex"
    );
    expect(
      (sendSpy.mock.calls[0][0] as ScanCommand).input.FilterExpression
    ).toBe("#lastDisconnected < :nextLastDisconnectedExpiration");
    expect(
      (sendSpy.mock.calls[0][0] as ScanCommand).input.ExpressionAttributeNames
    ).toEqual({
      "#lastDisconnected": "LastDisconnected",
    });
    expect(
      (sendSpy.mock.calls[0][0] as ScanCommand).input.ExpressionAttributeValues
    ).toEqual({
      ":nextLastDisconnectedExpiration": {
        N: expectNextLastDisconnectedExpiration.toString(),
      },
    });
  });

  test("the scan command returns a response with no Items array, returns any empty array", async () => {
    // Arrange
    const currentTime = Math.floor(new Date().getTime());
    const response = {
      $metadata: {},
    } as ScanCommandOutput;

    sendSpy.mockResolvedValueOnce(response as never);

    // Action
    const connections = await getAllExpiredConnections(currentTime);

    // Assert
    expect(connections).toHaveLength(0);
  });

  test("the scan command returns a response with an empty Items array, returns any empty array", async () => {
    // Arrange
    const currentTime = Math.floor(new Date().getTime());
    const response = {
      $metadata: {},
      Items: [],
    } as ScanCommandOutput;

    sendSpy.mockResolvedValueOnce(response as never);

    // Action
    const connections = await getAllExpiredConnections(currentTime);

    // Assert
    expect(connections).toHaveLength(0);
  });

  test("the scan command returns a response with items in the Items array, returns a mapped array", async () => {
    // Arrange
    const currentTime = Math.floor(new Date().getTime());
    const response = {
      $metadata: {},
      Items: [{}, {}],
    } as ScanCommandOutput;

    (
      mapFromDynamoToConnection as jest.MockedFunction<
        typeof mapFromDynamoToConnection
      >
    ).mockReturnValueOnce({} as RoomConnection);
    sendSpy.mockResolvedValueOnce(response as never);

    // Action
    const connections = await getAllExpiredConnections(currentTime);

    // Assert
    expect(connections).toHaveLength(2);
  });
});

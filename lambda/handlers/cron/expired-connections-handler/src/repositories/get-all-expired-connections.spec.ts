import { dbClient } from "@oigamez/dynamodb";
import { mapFromDynamoToConnection } from "@oigamez/mappers";
import { getAllExpiredConnections } from "./get-all-expired-connections";
import {
  DynamoDBClient,
  ScanCommand,
  ScanCommandOutput,
} from "@aws-sdk/client-dynamodb";
import { RoomConnection } from "@oigamez/models";

jest.mock("@oigamez/configuration", () => {
  return {
    CONNECTION_DYNAMO_LAST_DISCONNECTED_INDEX_NAME: "LastDisconnectedIndex",
    CONNECTION_DYNAMO_TABLE_NAME: "ConnectionTable",
    EXPIRED_DISCONNECTION_WINDOW_IN_SECONDS: 30,
  };
});
jest.mock("@oigamez/mappers");

describe("getAllExpiredConnections tests", () => {
  const sendSpy = jest.spyOn<DynamoDBClient, "send">(dbClient, "send");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("the scan command returns undefined, returns any empty array", async () => {
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

  it("the scan command returns a response with no Items array, returns any empty array", async () => {
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

  it("the scan command returns a response with an empty Items array, returns any empty array", async () => {
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

  it("the scan command returns a response with items in the Items array, returns a mapped array", async () => {
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

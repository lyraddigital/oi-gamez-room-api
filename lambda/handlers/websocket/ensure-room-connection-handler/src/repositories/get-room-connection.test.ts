import {
  DynamoDBClient,
  GetItemCommand,
  GetItemCommandOutput,
} from "@aws-sdk/client-dynamodb";
import { dbClient } from "@oigamez/dynamodb";
import { mapFromDynamoToConnection } from "@oigamez/mappers";
import { RoomConnection } from "@oigamez/models";

import { getRoomConnection } from "./get-room-connection";

jest.mock("@oigamez/mappers");
jest.mock("@oigamez/configuration", () => {
  return {
    CONNECTION_DYNAMO_TABLE_NAME: "SomeTable",
  };
});

describe("getRoomConnection tests", () => {
  const sendSpy = jest.spyOn<DynamoDBClient, "send">(dbClient, "send");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("makes the correct get item command to dynamo db and returns mapped response", async () => {
    // Arrange
    const roomCode = "ABCD";
    const username = "daryl_duck";
    const connection: RoomConnection = {
      roomCode,
      username,
      connectionId: "conn292928338",
    };
    const getItemResponse: GetItemCommandOutput = {
      Item: {},
      $metadata: {},
    };

    (
      mapFromDynamoToConnection as jest.MockedFunction<
        typeof mapFromDynamoToConnection
      >
    ).mockReturnValue(connection);

    sendSpy.mockReturnValueOnce(getItemResponse as any);

    // Action
    const result = await getRoomConnection(roomCode, username);

    // Assert
    expect(sendSpy.mock.calls.length).toBe(1);
    expect((sendSpy.mock.calls[0][0] as GetItemCommand).input.TableName).toBe(
      "SomeTable"
    );
    expect((sendSpy.mock.calls[0][0] as GetItemCommand).input.Key).toEqual({
      PK: { S: `Room#${roomCode}` },
      SK: { S: `#User#${username}` },
    });

    expect(result).toBeDefined();
    expect(result).toEqual(connection);
  });

  test("returns undefined if the get item command returns an no item", async () => {
    // Arrange
    const roomCode = "ABCD";
    const username = "daryl_duck";
    const getItemResponse: GetItemCommandOutput = {
      Item: undefined,
      $metadata: {},
    };

    sendSpy.mockReturnValueOnce(getItemResponse as any);

    // Action
    const result = await getRoomConnection(roomCode, username);

    // Assert
    expect(result).toBeUndefined();
  });
});

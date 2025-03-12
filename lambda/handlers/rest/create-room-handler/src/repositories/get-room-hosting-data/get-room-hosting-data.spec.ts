import {
  DynamoDBClient,
  QueryCommand,
  QueryCommandOutput,
} from "@aws-sdk/client-dynamodb";
import { dbClient } from "@oigamez/dynamodb";
import { getGameTypeById } from "@oigamez/repositories";

import { getRoomHostingData } from "./get-room-hosting-data";
import { GameType } from "@oigamez/models";

jest.mock("@oigamez/repositories", () => {
  return {
    getGameTypeById: jest.fn(),
  };
});
jest.mock("@oigamez/configuration", () => {
  return {
    DYNAMO_TABLE_NAME: "SomeTable",
    HOST_ROOM_INDEX_NAME: "SomeRoomIndex",
  };
});

describe("getRoomHostingData tests", () => {
  const sendSpy = jest.spyOn<DynamoDBClient, "send">(dbClient, "send");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("makes the correct query to dynamo db and returns mapped response", async () => {
    // Arrange
    const gameTypeId = 1;
    const username = "daryl_duck";
    const expectedGameType = {} as GameType;
    const queryResponse: QueryCommandOutput = {
      Items: [{}],
      $metadata: {},
    };

    (
      getGameTypeById as jest.MockedFunction<typeof getGameTypeById>
    ).mockReturnValueOnce(expectedGameType as any);
    sendSpy.mockReturnValueOnce(queryResponse as any);

    // Action
    const [gameType, isHosting] = await getRoomHostingData(
      gameTypeId,
      username
    );

    // Assert
    expect(gameType).toEqual(expectedGameType);
    expect(isHosting).toBe(true);
    expect(sendSpy.mock.calls.length).toBe(1);
    expect((sendSpy.mock.calls[0][0] as QueryCommand).input.TableName).toBe(
      "SomeTable"
    );
    expect((sendSpy.mock.calls[0][0] as QueryCommand).input.IndexName).toBe(
      "SomeRoomIndex"
    );
    expect(
      (sendSpy.mock.calls[0][0] as QueryCommand).input.KeyConditionExpression
    ).toBe("#hostUsername = :hostUsername");
    expect(
      (sendSpy.mock.calls[0][0] as QueryCommand).input.ExpressionAttributeNames
    ).toEqual({ "#hostUsername": "HostUsername" });
    expect(
      (sendSpy.mock.calls[0][0] as QueryCommand).input.ExpressionAttributeValues
    ).toEqual({ ":hostUsername": { S: username } });
    expect(getGameTypeById).toHaveBeenCalledWith(gameTypeId);
  });

  it("query returns no records, is hosting is false", async () => {
    // Arrange
    const gameTypeId = 1;
    const username = "daryl_duck";
    const expectedGameType = {} as GameType;
    const queryResponse: QueryCommandOutput = {
      Items: [],
      $metadata: {},
    };

    (
      getGameTypeById as jest.MockedFunction<typeof getGameTypeById>
    ).mockReturnValueOnce(expectedGameType as any);
    sendSpy.mockReturnValueOnce(queryResponse as any);

    // Action
    const [_, isHosting] = await getRoomHostingData(gameTypeId, username);

    // Assert
    expect(isHosting).toBe(false);
    expect(getGameTypeById).toHaveBeenCalledWith(gameTypeId);
  });
});

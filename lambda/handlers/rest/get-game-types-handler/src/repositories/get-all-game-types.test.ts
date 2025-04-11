import {
  DynamoDBClient,
  QueryCommand,
  QueryCommandOutput,
} from "@aws-sdk/client-dynamodb";

import { GameType } from "@oigamez/core";
import { dbClient, mapFromDynamoToGameType } from "@oigamez/data";

import { getAllGameTypes } from "./get-all-game-types.js";

jest.mock("@oigamez/core", () => {
  return {
    DYNAMO_TABLE_NAME: "SomeTable",
  };
});
jest.mock("@oigamez/data");

describe("getAllGameTypes tests", () => {
  const sendSpy = jest.spyOn<DynamoDBClient, "send">(dbClient, "send");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("makes the correct query to dynamo db and returns mapped response", async () => {
    // Arrange
    const aGameType: GameType = {
      id: 1,
      name: "Some Game",
      description: "This is the description of a game",
      iconUrl: "http://iconsrc.com/some_icon.png",
      minNumOfUsers: 2,
      maxNumOfUsers: 4,
    };
    const queryResponse: QueryCommandOutput = {
      Items: [{}],
      $metadata: {},
    };

    (
      mapFromDynamoToGameType as jest.MockedFunction<
        typeof mapFromDynamoToGameType
      >
    ).mockReturnValue(aGameType);

    sendSpy.mockReturnValueOnce(queryResponse as any);

    // Action
    const results = await getAllGameTypes();

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
    ).toEqual({ ":pk": { S: "GameTypes" } });
    expect(results).toBeDefined();
    expect(results.length).toBe(1);
    expect(results[0]).toBe(aGameType);
  });

  test("dynamo db query returns an empty array, returns an empty array overall", async () => {
    // Arrange
    const queryResponse: QueryCommandOutput = {
      Items: [],
      $metadata: {},
    };

    sendSpy.mockReturnValueOnce(queryResponse as any);

    // Action
    const results = await getAllGameTypes();

    // Assert
    expect(results).toBeDefined();
    expect(results.length).toBe(0);
  });
});

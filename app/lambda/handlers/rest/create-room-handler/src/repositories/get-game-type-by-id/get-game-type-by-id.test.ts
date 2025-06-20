import {
  DynamoDBClient,
  GetItemCommand,
  GetItemCommandOutput,
} from "@aws-sdk/client-dynamodb";

import { GameType } from "@oigamez/core";
import { dbClient, mapFromDynamoToGameType } from "@oigamez/data";

import { getGameTypeById } from "./get-game-type-by-id";

jest.mock("@oigamez/core", () => {
  return {
    DYNAMO_TABLE_NAME: "SomeTable",
  };
});
jest.mock("@oigamez/data", () => {
  return {
    ...jest.requireActual("@oigamez/data"),
    mapFromDynamoToGameType: jest.fn(),
  };
});

describe("getGameTypeById tests", () => {
  const sendSpy = jest.spyOn<DynamoDBClient, "send">(dbClient, "send");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("makes the correct get to dynamo db and returns mapped response", async () => {
    // Arrange
    const gameTypeId = 1;
    const aGameType: GameType = {
      id: gameTypeId,
      name: "Some Game",
      description: "This is the description of a game",
      iconUrl: "http://iconsrc.com/some_icon.png",
      minNumOfUsers: 2,
      maxNumOfUsers: 4,
    };
    const getItemResponse: GetItemCommandOutput = {
      Item: {},
      $metadata: {},
    };

    (
      mapFromDynamoToGameType as jest.MockedFunction<
        typeof mapFromDynamoToGameType
      >
    ).mockReturnValue(aGameType);

    sendSpy.mockReturnValueOnce(getItemResponse as any);

    // Action
    const result = await getGameTypeById(gameTypeId);

    // Assert
    expect(sendSpy.mock.calls.length).toBe(1);
    expect((sendSpy.mock.calls[0][0] as GetItemCommand).input.TableName).toBe(
      "SomeTable"
    );
    expect((sendSpy.mock.calls[0][0] as GetItemCommand).input.Key).toEqual({
      PK: { S: "GameTypes" },
      SK: { S: `#${gameTypeId}` },
    });
    expect(result).toBeDefined();
    expect(result).toEqual(aGameType);
  });

  test("dynamo db get returns undefined, returns undefined", async () => {
    // Arrange
    const gameTypeId = 1;
    const getItemResponse: GetItemCommandOutput = {
      Item: undefined,
      $metadata: {},
    };

    sendSpy.mockReturnValueOnce(getItemResponse as any);

    // Action
    const result = await getGameTypeById(gameTypeId);

    // Assert
    expect(result).toBeUndefined();
  });
});

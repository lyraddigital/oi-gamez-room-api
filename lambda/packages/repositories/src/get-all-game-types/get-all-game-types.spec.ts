import { QueryCommand, QueryCommandOutput } from "@aws-sdk/client-dynamodb";
import { mapFromDynamoToGameType } from "@oigamez/mappers";
import { GameType } from "@oigamez/models";

jest.mock("@oigamez/mappers");
jest.mock("@oigamez/configuration", () => {
  return {
    DYNAMO_TABLE_NAME: "SomeTable",
  };
});

describe("getAllGameTypes tests", () => {
  let sendFn = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.mock("@oigamez/dynamodb", () => {
      return {
        ...jest.requireActual("@oigamez/dynamodb"),
        dbClient: {
          send: sendFn,
        },
      };
    });
  });

  it("makes the correct query to dynamo db and returns mapped response", async () => {
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

    sendFn.mockResolvedValueOnce(Promise.resolve(queryResponse));

    const { getAllGameTypes } = await import("./get-all-game-types");

    // Action
    const results = await getAllGameTypes();

    // Assert
    expect(sendFn.mock.calls.length).toBe(1);
    expect((sendFn.mock.calls[0][0] as QueryCommand).input.TableName).toBe(
      "SomeTable"
    );
    expect(
      (sendFn.mock.calls[0][0] as QueryCommand).input.KeyConditionExpression
    ).toBe("#pk = :pk");
    expect(
      (sendFn.mock.calls[0][0] as QueryCommand).input.ExpressionAttributeNames
    ).toEqual({ "#pk": "PK" });
    expect(
      (sendFn.mock.calls[0][0] as QueryCommand).input.ExpressionAttributeValues
    ).toEqual({ ":pk": { S: "GameTypes" } });
    expect(results).toBeDefined();
    expect(results.length).toBe(1);
    expect(results[0]).toBe(aGameType);
  });
});

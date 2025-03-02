import { AttributeValue } from "@aws-sdk/client-dynamodb";

import { mapFromDynamoToGameType } from "./game-type.mapper";

describe("mapFromDynamoToGameType tests", () => {
  it("maps a DynamoDb record to GameType correctly", () => {
    // Arrange
    const gameTypeId = 123456;
    const name = "Chess";
    const description = "Online Chess";
    const iconUrl = "http://www.somecdn.com/chess.png";
    const minNumOfUsers = 2;
    const maxNumOfUsers = 2;
    const dbRecord: Record<string, AttributeValue> = {
      GameTypeId: { N: gameTypeId.toString() },
      Name: { S: name },
      Description: { S: description },
      IconUrl: { S: iconUrl },
      MinNumberOfUsers: { N: minNumOfUsers.toString() },
      MaxNumberOfUsers: { N: maxNumOfUsers.toString() },
    };

    // Action
    const gameType = mapFromDynamoToGameType(dbRecord);

    // Assert
    expect(gameType).toBeDefined();
    expect(gameType.id).toBe(gameTypeId);
    expect(gameType.name).toBe(name);
    expect(gameType.description).toBe(description);
    expect(gameType.iconUrl).toBe(iconUrl);
    expect(gameType.minNumOfUsers).toBe(minNumOfUsers);
    expect(gameType.maxNumOfUsers).toBe(maxNumOfUsers);
  });
});

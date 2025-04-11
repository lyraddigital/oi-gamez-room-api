import { GameType } from "@oigamez/core";

import { runCreateRoomRuleSet } from "./create-room.ruleSet.js";

describe("runCreateRoomRuleSet tests", () => {
  test("game type not set and is already hosting, returns correct validation result data", () => {
    // Arrange
    const isAlreadyHosting = true;

    // Action
    const ruleSetResult = runCreateRoomRuleSet(undefined, isAlreadyHosting);

    // Assert
    expect(ruleSetResult.isSuccessful).toBe(false);
    expect(ruleSetResult.errorMessages).toHaveLength(2);
    expect(ruleSetResult.errorMessages[0]).toBe(
      "Incorrect game type set for room"
    );
    expect(ruleSetResult.errorMessages[1]).toBe(
      "You are already hosting a room"
    );
  });

  test("game type not set and is not already hosting, returns correct validation result data", () => {
    // Arrange
    const isAlreadyHosting = false;

    // Action
    const ruleSetResult = runCreateRoomRuleSet(undefined, isAlreadyHosting);

    // Assert
    expect(ruleSetResult.isSuccessful).toBe(false);
    expect(ruleSetResult.errorMessages).toHaveLength(1);
    expect(ruleSetResult.errorMessages[0]).toBe(
      "Incorrect game type set for room"
    );
  });

  test("game type is set is already hosting, returns correct validation result data", () => {
    // Arrange
    const gameType = {} as GameType;
    const isAlreadyHosting = true;

    // Action
    const ruleSetResult = runCreateRoomRuleSet(gameType, isAlreadyHosting);

    // Assert
    expect(ruleSetResult.isSuccessful).toBe(false);
    expect(ruleSetResult.errorMessages).toHaveLength(1);
    expect(ruleSetResult.errorMessages[0]).toBe(
      "You are already hosting a room"
    );
  });

  test("game type is set is not already hosting, returns correct validation result data", () => {
    // Arrange
    const gameType = {} as GameType;
    const isAlreadyHosting = false;

    // Action
    const ruleSetResult = runCreateRoomRuleSet(gameType, isAlreadyHosting);

    // Assert
    expect(ruleSetResult.isSuccessful).toBe(true);
    expect(ruleSetResult.errorMessages).toHaveLength(0);
  });
});

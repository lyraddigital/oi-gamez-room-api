import { GameType } from "/opt/nodejs/oigamez-core";

import { runCreateRoomRuleSet } from "./create-room.ruleSet";

describe("runCreateRoomRuleSet tests", () => {
  test("game type not set and is already hosting, returns correct validation result data", () => {
    // Arrange
    const isAlreadyHosting = true;

    // Action
    const validationResult = runCreateRoomRuleSet(undefined, isAlreadyHosting);

    // Assert
    expect(validationResult.isSuccessful).toBe(false);
    expect(validationResult.errorMessages).toHaveLength(2);
    expect(validationResult.errorMessages[0]).toBe(
      "Incorrect game type set for room"
    );
    expect(validationResult.errorMessages[1]).toBe(
      "You are already hosting a room"
    );
  });

  test("game type not set and is not already hosting, returns correct validation result data", () => {
    // Arrange
    const isAlreadyHosting = false;

    // Action
    const validationResult = runCreateRoomRuleSet(undefined, isAlreadyHosting);

    // Assert
    expect(validationResult.isSuccessful).toBe(false);
    expect(validationResult.errorMessages).toHaveLength(1);
    expect(validationResult.errorMessages[0]).toBe(
      "Incorrect game type set for room"
    );
  });

  test("game type is set is already hosting, returns correct validation result data", () => {
    // Arrange
    const gameType = {} as GameType;
    const isAlreadyHosting = true;

    // Action
    const validationResult = runCreateRoomRuleSet(gameType, isAlreadyHosting);

    // Assert
    expect(validationResult.isSuccessful).toBe(false);
    expect(validationResult.errorMessages).toHaveLength(1);
    expect(validationResult.errorMessages[0]).toBe(
      "You are already hosting a room"
    );
  });

  test("game type is set is not already hosting, returns correct validation result data", () => {
    // Arrange
    const gameType = {} as GameType;
    const isAlreadyHosting = false;

    // Action
    const validationResult = runCreateRoomRuleSet(gameType, isAlreadyHosting);

    // Assert
    expect(validationResult.isSuccessful).toBe(true);
    expect(validationResult.errorMessages).toHaveLength(0);
  });
});

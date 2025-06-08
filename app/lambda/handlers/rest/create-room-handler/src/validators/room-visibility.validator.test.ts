import { validateRoomTitle } from "./room-title.validator";

describe("validateRoomTitle tests", () => {
  test("room title is not set, returns correct validation result data", () => {
    // Arrange / Action
    const validationResult = validateRoomTitle(undefined);

    // Assert
    expect(validationResult).toBeDefined();
    expect(validationResult.isSuccessful).toBe(false);
    expect(validationResult.errorMessages).toHaveLength(1);
    expect(validationResult.errorMessages[0]).toBe("Room title is required");
  });

  test("room title is less than 5 characters, returns correct validation result data", () => {
    // Arrange
    const roomTitle = "abcd";

    // Action
    const validationResult = validateRoomTitle(roomTitle);

    // Assert
    expect(validationResult).toBeDefined();
    expect(validationResult.isSuccessful).toBe(false);
    expect(validationResult.errorMessages).toHaveLength(1);
    expect(validationResult.errorMessages[0]).toBe(
      "Room title must be between 5 and 50 characters"
    );
  });

  test("room title is more than 50 characters, returns correct validation result data", () => {
    // Arrange
    const roomTitle = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxy";

    // Action
    const validationResult = validateRoomTitle(roomTitle);

    // Assert
    expect(validationResult).toBeDefined();
    expect(validationResult.isSuccessful).toBe(false);
    expect(validationResult.errorMessages).toHaveLength(1);
    expect(validationResult.errorMessages[0]).toBe(
      "Room title must be between 5 and 50 characters"
    );
  });

  test("room title is 5 characters, returns correct validation result data", () => {
    // Arrange
    const roomTitle = "abcde";

    // Action
    const validationResult = validateRoomTitle(roomTitle);

    // Assert
    expect(validationResult).toBeDefined();
    expect(validationResult.isSuccessful).toBe(true);
    expect(validationResult.errorMessages).toHaveLength(0);
  });

  test("room title is 25 characters, returns correct validation result data", () => {
    // Arrange
    const roomTitle = "abcdefghijklmnopqrstuvwxy";

    // Action
    const validationResult = validateRoomTitle(roomTitle);

    // Assert
    expect(validationResult).toBeDefined();
    expect(validationResult.isSuccessful).toBe(true);
    expect(validationResult.errorMessages).toHaveLength(0);
  });

  test("room title is 50 characters, returns correct validation result data", () => {
    // Arrange
    const roomTitle = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwx";

    // Action
    const validationResult = validateRoomTitle(roomTitle);

    // Assert
    expect(validationResult).toBeDefined();
    expect(validationResult.isSuccessful).toBe(true);
    expect(validationResult.errorMessages).toHaveLength(0);
  });
});

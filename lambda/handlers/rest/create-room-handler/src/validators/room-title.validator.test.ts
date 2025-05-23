import { validateRoomVisibility } from "./room-visibility.validator.js";

describe("validateRoomVisibility tests", () => {
  test("isPublic is not set, returns correct validation result data", () => {
    // Arrange / Action
    const validationResult = validateRoomVisibility(undefined);

    // Assert
    expect(validationResult).toBeDefined();
    expect(validationResult.isSuccessful).toBe(false);
    expect(validationResult.errorMessages).toHaveLength(1);
    expect(validationResult.errorMessages[0]).toBe(
      "You need to specify if the room is public or not"
    );
  });

  test("isPublic is set, returns correct validation result data", () => {
    // Arrange
    const isPublic = false;

    // Action
    const validationResult = validateRoomVisibility(isPublic);

    // Assert
    expect(validationResult).toBeDefined();
    expect(validationResult.isSuccessful).toBe(true);
  });
});

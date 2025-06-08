import { validateOrigin, validateRoomCode } from "@oigamez/http";

import { validateRequest } from "./validate-request";

jest.mock("@oigamez/http", () => {
  return {
    ...jest.requireActual("@oigamez/http"),
    validateOrigin: jest.fn(),
    validateRoomCode: jest.fn(),
  };
});

describe("validateRequest tests", () => {
  test("validateOrigin returns unsuccessful, returns origin validation result", () => {
    // Arrange
    const errorMessage = "Invalid origin";

    (
      validateOrigin as jest.MockedFunction<typeof validateOrigin>
    ).mockReturnValueOnce({
      isSuccessful: false,
      errorMessages: [errorMessage],
    });

    // Action
    const validationResult = validateRequest();

    // Assert
    expect(validationResult).toBeDefined();
    expect(validationResult.isSuccessful).toBe(false);
    expect(validationResult.errorMessages).toHaveLength(1);
    expect(validationResult.errorMessages[0]).toBe(errorMessage);
  });

  test("validateRoomCode returns unsuccessful, returns room code validation result", () => {
    // Arrange
    const errorMessage = "Invalid room code";

    (
      validateOrigin as jest.MockedFunction<typeof validateOrigin>
    ).mockReturnValueOnce({
      isSuccessful: true,
      errorMessages: [],
    });
    (
      validateRoomCode as jest.MockedFunction<typeof validateRoomCode>
    ).mockReturnValueOnce({
      isSuccessful: false,
      errorMessages: [errorMessage],
    });

    // Action
    const validationResult = validateRequest();

    // Assert
    expect(validationResult).toBeDefined();
    expect(validationResult.isSuccessful).toBe(false);
    expect(validationResult.errorMessages).toHaveLength(1);
    expect(validationResult.errorMessages[0]).toBe(errorMessage);
  });

  test("all validation passes, returns a successful validation result", () => {
    // Arrange
    (
      validateOrigin as jest.MockedFunction<typeof validateOrigin>
    ).mockReturnValueOnce({
      isSuccessful: true,
      errorMessages: [],
    });
    (
      validateRoomCode as jest.MockedFunction<typeof validateRoomCode>
    ).mockReturnValueOnce({
      isSuccessful: true,
      errorMessages: [],
    });

    // Action
    const validationResult = validateRequest();

    // Assert
    expect(validationResult).toBeDefined();
    expect(validationResult.isSuccessful).toBe(true);
    expect(validationResult.errorMessages).toHaveLength(0);
  });
});

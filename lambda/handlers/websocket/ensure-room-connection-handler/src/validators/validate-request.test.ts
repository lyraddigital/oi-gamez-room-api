import {
  validateRoomCode,
  validateUsername,
} from "/opt/nodejs/oigamez-http.js";
import { validateRequest } from "./validate-request.js";

jest.mock("/opt/nodejs/oigamez-http.js", () => {
  return {
    validateRoomCode: jest.fn(),
    validateUsername: jest.fn(),
  };
});

describe("validateRequest tests for ensuring room connection", () => {
  test("validateUsername and validateRoomCode returns unsuccessful, returns validation result with correct errors", () => {
    // Arrange
    const usernameErrorMessage = "Invalid username";
    const roomCodeErrorMessage = "Invalid room code";

    (
      validateUsername as jest.MockedFunction<typeof validateUsername>
    ).mockReturnValueOnce({
      isSuccessful: false,
      errorMessages: [usernameErrorMessage],
    });
    (
      validateRoomCode as jest.MockedFunction<typeof validateRoomCode>
    ).mockReturnValueOnce({
      isSuccessful: false,
      errorMessages: [roomCodeErrorMessage],
    });

    // Action
    const validationResult = validateRequest();

    // Assert
    expect(validationResult).toBeDefined();
    expect(validationResult.isSuccessful).toBe(false);
    expect(validationResult.errorMessages).toHaveLength(2);
    expect(validationResult.errorMessages[0]).toBe(usernameErrorMessage);
    expect(validationResult.errorMessages[1]).toBe(roomCodeErrorMessage);
  });

  test("validateUsername returns unsuccessful, returns validation result with correct errors", () => {
    // Arrange
    const usernameErrorMessage = "Invalid username";

    (
      validateUsername as jest.MockedFunction<typeof validateUsername>
    ).mockReturnValueOnce({
      isSuccessful: false,
      errorMessages: [usernameErrorMessage],
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
    expect(validationResult.isSuccessful).toBe(false);
    expect(validationResult.errorMessages).toHaveLength(1);
    expect(validationResult.errorMessages[0]).toBe(usernameErrorMessage);
  });

  test("validateRoomCode returns unsuccessful, returns validation result with correct errors", () => {
    // Arrange
    const roomCodeErrorMessage = "Invalid room code";

    (
      validateUsername as jest.MockedFunction<typeof validateUsername>
    ).mockReturnValueOnce({
      isSuccessful: true,
      errorMessages: [],
    });
    (
      validateRoomCode as jest.MockedFunction<typeof validateRoomCode>
    ).mockReturnValueOnce({
      isSuccessful: false,
      errorMessages: [roomCodeErrorMessage],
    });

    // Action
    const validationResult = validateRequest();

    // Assert
    expect(validationResult).toBeDefined();
    expect(validationResult.isSuccessful).toBe(false);
    expect(validationResult.errorMessages).toHaveLength(1);
    expect(validationResult.errorMessages[0]).toBe(roomCodeErrorMessage);
  });

  test("all validation is valid, returns validation result with correct errors", () => {
    // Arrange
    (
      validateUsername as jest.MockedFunction<typeof validateUsername>
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

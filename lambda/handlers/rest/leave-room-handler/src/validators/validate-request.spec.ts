import {
  validateOrigin,
  validateRoomCode,
  validateUsername,
} from "@oigamez/validators";

jest.mock("@oigamez/validators", () => {
  return {
    validateOrigin: jest.fn(),
    validateRoomCode: jest.fn(),
    validateUsername: jest.fn(),
  };
});

import { LeaveRoomPayload } from "../models";
import { validateRequest } from "./validate-request";

describe("validateRequest for leave room tests", () => {
  it("validateOrigin returns unsuccessful, returns origin validation result", () => {
    // Arrange
    const errorMessage = "Invalid origin";
    const isOriginValidationSuccess = false;

    (
      validateOrigin as jest.MockedFunction<typeof validateOrigin>
    ).mockReturnValueOnce({
      isSuccessful: isOriginValidationSuccess,
      errorMessages: [errorMessage],
    });

    // Action
    const validationResult = validateRequest();

    // Assert
    expect(validationResult).toBeDefined();
    expect(validationResult.isSuccessful).toBe(isOriginValidationSuccess);
    expect(validationResult.errorMessages).toHaveLength(1);
    expect(validationResult.errorMessages[0]).toBe(errorMessage);
    expect(validateOrigin).toHaveBeenCalledWith(undefined);
  });

  it("payload not set, returns correct validation result", () => {
    // Arrange
    const origin = "someOrigin";

    (
      validateOrigin as jest.MockedFunction<typeof validateOrigin>
    ).mockReturnValueOnce({
      isSuccessful: true,
      errorMessages: [],
    });

    // Action
    const validationResult = validateRequest(origin);

    // Assert
    expect(validationResult).toBeDefined();
    expect(validationResult.isSuccessful).toBe(false);
    expect(validationResult.errorMessages).toHaveLength(1);
    expect(validationResult.errorMessages[0]).toBe(
      "Missing payload from request"
    );
    expect(validateOrigin).toHaveBeenCalledWith(origin);
  });

  it("payload is set, but all data is invalid and room code not set, returns correct validation result", () => {
    // Arrange
    const origin = "someOrigin";
    const payload = {} as LeaveRoomPayload;
    const isUsernameErrorMessage = "Invalid username";
    const isRoomCodeErrorMessage = "Invalid room code";

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
      errorMessages: [isRoomCodeErrorMessage],
    });
    (
      validateUsername as jest.MockedFunction<typeof validateUsername>
    ).mockReturnValueOnce({
      isSuccessful: false,
      errorMessages: [isUsernameErrorMessage],
    });

    // Action
    const validationResult = validateRequest(origin, undefined, payload);

    // Assert
    expect(validationResult).toBeDefined();
    expect(validationResult.isSuccessful).toBe(false);
    expect(validationResult.errorMessages).toHaveLength(2);
    expect(validationResult.errorMessages[0]).toBe(isUsernameErrorMessage);
    expect(validationResult.errorMessages[1]).toBe(isRoomCodeErrorMessage);
    expect(validateOrigin).toHaveBeenCalledWith(origin);
    expect(validateRoomCode).toHaveBeenCalledWith(undefined);
    expect(validateUsername).toHaveBeenCalledWith(undefined);
  });

  it("payload is set, but username is invalid, returns correct validation result", () => {
    // Arrange
    const origin = "someOrigin";
    const payload = {} as LeaveRoomPayload;
    const roomCode = "ABCD";
    const isUsernameErrorMessage = "Invalid username";

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
    (
      validateUsername as jest.MockedFunction<typeof validateUsername>
    ).mockReturnValueOnce({
      isSuccessful: false,
      errorMessages: [isUsernameErrorMessage],
    });

    // Action
    const validationResult = validateRequest(origin, roomCode, payload);

    // Assert
    expect(validationResult).toBeDefined();
    expect(validationResult.isSuccessful).toBe(false);
    expect(validationResult.errorMessages).toHaveLength(1);
    expect(validationResult.errorMessages[0]).toBe(isUsernameErrorMessage);
    expect(validateOrigin).toHaveBeenCalledWith(origin);
    expect(validateRoomCode).toHaveBeenCalledWith(roomCode);
    expect(validateUsername).toHaveBeenCalledWith(undefined);
  });

  it("payload is set, but room code is invalid, returns correct validation result", () => {
    // Arrange
    const origin = "someOrigin";
    const payload = {
      username: "daryl_duck",
    } as LeaveRoomPayload;
    const isRoomCodeErrorMessage = "Invalid room code";

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
      errorMessages: [isRoomCodeErrorMessage],
    });
    (
      validateUsername as jest.MockedFunction<typeof validateUsername>
    ).mockReturnValueOnce({
      isSuccessful: true,
      errorMessages: [],
    });

    // Action
    const validationResult = validateRequest(origin, undefined, payload);

    // Assert
    expect(validationResult).toBeDefined();
    expect(validationResult.isSuccessful).toBe(false);
    expect(validationResult.errorMessages).toHaveLength(1);
    expect(validationResult.errorMessages[0]).toBe(isRoomCodeErrorMessage);
    expect(validateOrigin).toHaveBeenCalledWith(origin);
    expect(validateRoomCode).toHaveBeenCalledWith(undefined);
    expect(validateUsername).toHaveBeenCalledWith(payload.username);
  });

  it("payload is set and all data is valid, returns correct validation result", () => {
    // Arrange
    const origin = "someOrigin";
    const roomCode = "ABCD";
    const payload = {
      username: "daryl_duck",
    } as LeaveRoomPayload;

    (
      validateOrigin as jest.MockedFunction<typeof validateOrigin>
    ).mockReturnValueOnce({
      isSuccessful: true,
      errorMessages: [],
    });
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
    const validationResult = validateRequest(origin, roomCode, payload);

    // Assert
    expect(validationResult).toBeDefined();
    expect(validationResult.isSuccessful).toBe(true);
    expect(validationResult.errorMessages).toHaveLength(0);
    expect(validateOrigin).toHaveBeenCalledWith(origin);
    expect(validateRoomCode).toHaveBeenCalledWith(roomCode);
    expect(validateUsername).toHaveBeenCalledWith(payload.username);
  });
});

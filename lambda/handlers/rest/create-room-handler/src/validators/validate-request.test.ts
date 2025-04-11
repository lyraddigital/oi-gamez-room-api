import { validateOrigin, validateUsername } from "/opt/nodejs/oigamez-http.js";

import { CreateRoomPayload } from "../models/index.js";
import { validateGameTypeId } from "./game-type-id.validator.js";
import { validateRoomTitle } from "./room-title.validator.js";
import { validateRoomVisibility } from "./room-visibility.validator.js";
import { validateRequest } from "./validate-request.js";

jest.mock("/opt/nodejs/oigamez-http.js", () => {
  return {
    validateGameTypeId: jest.fn(),
    validateOrigin: jest.fn(),
    validateUsername: jest.fn(),
  };
});

jest.mock("./game-type-id.validator.js");
jest.mock("./room-title.validator.js");
jest.mock("./room-visibility.validator.js");

describe("validateRequest tests", () => {
  test("validateOrigin returns unsuccessful, returns origin validation result", () => {
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
  });

  test("payload not set, returns correct validation result", () => {
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
  });

  test("payload is set, but all data is invalid, returns correct validation result", () => {
    // Arrange
    const origin = "someOrigin";
    const payload = {} as CreateRoomPayload;
    const isGameTypeIdErrorMessage = "Invalid game type id";
    const isUsernameErrorMessage = "Invalid username";
    const roomTitleErrorMessage = "Invalid room title";
    const roomVisibilityErrorMessage = "Invalid room visibility";

    (
      validateOrigin as jest.MockedFunction<typeof validateOrigin>
    ).mockReturnValueOnce({
      isSuccessful: true,
      errorMessages: [],
    });
    (
      validateGameTypeId as jest.MockedFunction<typeof validateGameTypeId>
    ).mockReturnValueOnce({
      isSuccessful: false,
      errorMessages: [isGameTypeIdErrorMessage],
    });
    (
      validateUsername as jest.MockedFunction<typeof validateUsername>
    ).mockReturnValueOnce({
      isSuccessful: false,
      errorMessages: [isUsernameErrorMessage],
    });
    (
      validateRoomTitle as jest.MockedFunction<typeof validateRoomTitle>
    ).mockReturnValueOnce({
      isSuccessful: false,
      errorMessages: [roomTitleErrorMessage],
    });
    (
      validateRoomVisibility as jest.MockedFunction<
        typeof validateRoomVisibility
      >
    ).mockReturnValueOnce({
      isSuccessful: false,
      errorMessages: [roomVisibilityErrorMessage],
    });

    // Action
    const validationResult = validateRequest(origin, payload);

    // Assert
    expect(validationResult).toBeDefined();
    expect(validationResult.isSuccessful).toBe(false);
    expect(validationResult.errorMessages).toHaveLength(4);
    expect(validationResult.errorMessages[0]).toBe(isGameTypeIdErrorMessage);
    expect(validationResult.errorMessages[1]).toBe(isUsernameErrorMessage);
    expect(validationResult.errorMessages[2]).toBe(roomTitleErrorMessage);
    expect(validationResult.errorMessages[3]).toBe(roomVisibilityErrorMessage);
  });

  test("payload is set, but game type id is invalid, returns correct validation result", () => {
    // Arrange
    const origin = "someOrigin";
    const payload = {} as CreateRoomPayload;
    const isGameTypeIdErrorMessage = "Invalid game type id";

    (
      validateOrigin as jest.MockedFunction<typeof validateOrigin>
    ).mockReturnValueOnce({
      isSuccessful: true,
      errorMessages: [],
    });
    (
      validateGameTypeId as jest.MockedFunction<typeof validateGameTypeId>
    ).mockReturnValueOnce({
      isSuccessful: false,
      errorMessages: [isGameTypeIdErrorMessage],
    });
    (
      validateUsername as jest.MockedFunction<typeof validateUsername>
    ).mockReturnValueOnce({
      isSuccessful: true,
      errorMessages: [],
    });
    (
      validateRoomTitle as jest.MockedFunction<typeof validateRoomTitle>
    ).mockReturnValueOnce({
      isSuccessful: true,
      errorMessages: [],
    });
    (
      validateRoomVisibility as jest.MockedFunction<
        typeof validateRoomVisibility
      >
    ).mockReturnValueOnce({
      isSuccessful: true,
      errorMessages: [],
    });

    // Action
    const validationResult = validateRequest(origin, payload);

    // Assert
    expect(validationResult).toBeDefined();
    expect(validationResult.isSuccessful).toBe(false);
    expect(validationResult.errorMessages).toHaveLength(1);
    expect(validationResult.errorMessages[0]).toBe(isGameTypeIdErrorMessage);
  });

  test("payload is set, but username is invalid, returns correct validation result", () => {
    // Arrange
    const origin = "someOrigin";
    const payload = {} as CreateRoomPayload;
    const isUsernameErrorMessage = "Invalid username";

    (
      validateOrigin as jest.MockedFunction<typeof validateOrigin>
    ).mockReturnValueOnce({
      isSuccessful: true,
      errorMessages: [],
    });
    (
      validateGameTypeId as jest.MockedFunction<typeof validateGameTypeId>
    ).mockReturnValueOnce({
      isSuccessful: false,
      errorMessages: [],
    });
    (
      validateUsername as jest.MockedFunction<typeof validateUsername>
    ).mockReturnValueOnce({
      isSuccessful: false,
      errorMessages: [isUsernameErrorMessage],
    });
    (
      validateRoomTitle as jest.MockedFunction<typeof validateRoomTitle>
    ).mockReturnValueOnce({
      isSuccessful: true,
      errorMessages: [],
    });
    (
      validateRoomVisibility as jest.MockedFunction<
        typeof validateRoomVisibility
      >
    ).mockReturnValueOnce({
      isSuccessful: true,
      errorMessages: [],
    });

    // Action
    const validationResult = validateRequest(origin, payload);

    // Assert
    expect(validationResult).toBeDefined();
    expect(validationResult.isSuccessful).toBe(false);
    expect(validationResult.errorMessages).toHaveLength(1);
    expect(validationResult.errorMessages[0]).toBe(isUsernameErrorMessage);
  });

  test("payload is set, but room title is invalid, returns correct validation result", () => {
    // Arrange
    const origin = "someOrigin";
    const payload = {} as CreateRoomPayload;
    const roomTitleErrorMessage = "Invalid room title";

    (
      validateOrigin as jest.MockedFunction<typeof validateOrigin>
    ).mockReturnValueOnce({
      isSuccessful: true,
      errorMessages: [],
    });
    (
      validateGameTypeId as jest.MockedFunction<typeof validateGameTypeId>
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
      validateRoomTitle as jest.MockedFunction<typeof validateRoomTitle>
    ).mockReturnValueOnce({
      isSuccessful: false,
      errorMessages: [roomTitleErrorMessage],
    });
    (
      validateRoomVisibility as jest.MockedFunction<
        typeof validateRoomVisibility
      >
    ).mockReturnValueOnce({
      isSuccessful: true,
      errorMessages: [],
    });

    // Action
    const validationResult = validateRequest(origin, payload);

    // Assert
    expect(validationResult).toBeDefined();
    expect(validationResult.isSuccessful).toBe(false);
    expect(validationResult.errorMessages).toHaveLength(1);
    expect(validationResult.errorMessages[0]).toBe(roomTitleErrorMessage);
  });

  test("payload is set, but room visibility is invalid, returns correct validation result", () => {
    // Arrange
    const origin = "someOrigin";
    const payload = {} as CreateRoomPayload;
    const roomVisibilityErrorMessage = "Invalid room visibility";

    (
      validateOrigin as jest.MockedFunction<typeof validateOrigin>
    ).mockReturnValueOnce({
      isSuccessful: true,
      errorMessages: [],
    });
    (
      validateGameTypeId as jest.MockedFunction<typeof validateGameTypeId>
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
      validateRoomTitle as jest.MockedFunction<typeof validateRoomTitle>
    ).mockReturnValueOnce({
      isSuccessful: true,
      errorMessages: [],
    });
    (
      validateRoomVisibility as jest.MockedFunction<
        typeof validateRoomVisibility
      >
    ).mockReturnValueOnce({
      isSuccessful: false,
      errorMessages: [roomVisibilityErrorMessage],
    });

    // Action
    const validationResult = validateRequest(origin, payload);

    // Assert
    expect(validationResult).toBeDefined();
    expect(validationResult.isSuccessful).toBe(false);
    expect(validationResult.errorMessages).toHaveLength(1);
    expect(validationResult.errorMessages[0]).toBe(roomVisibilityErrorMessage);
  });

  test("payload is set and all data is valid, returns correct validation result", () => {
    // Arrange
    const origin = "someOrigin";
    const payload = {} as CreateRoomPayload;

    (
      validateOrigin as jest.MockedFunction<typeof validateOrigin>
    ).mockReturnValueOnce({
      isSuccessful: true,
      errorMessages: [],
    });
    (
      validateGameTypeId as jest.MockedFunction<typeof validateGameTypeId>
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
      validateRoomTitle as jest.MockedFunction<typeof validateRoomTitle>
    ).mockReturnValueOnce({
      isSuccessful: true,
      errorMessages: [],
    });
    (
      validateRoomVisibility as jest.MockedFunction<
        typeof validateRoomVisibility
      >
    ).mockReturnValueOnce({
      isSuccessful: true,
      errorMessages: [],
    });

    // Action
    const validationResult = validateRequest(origin, payload);

    // Assert
    expect(validationResult).toBeDefined();
    expect(validationResult.isSuccessful).toBe(true);
    expect(validationResult.errorMessages).toHaveLength(0);
  });
});

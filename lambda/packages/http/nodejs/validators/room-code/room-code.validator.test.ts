import { validateRoomCode } from "./room-code.validator";

describe("validateRoomCode tests", () => {
  test("room code not set, returns unsuccessful", () => {
    // Arrange / Action
    const result = validateRoomCode(undefined);

    // Assert
    expect(result).toBeDefined();
    expect(result.errorMessages).toEqual(["Room code is required"]);
    expect(result.isSuccessful).toBe(false);
  });

  test("room code is set, but too many letters, returns unsuccessful", () => {
    // Arrange / Action
    const result = validateRoomCode("INVALIDCODE");

    // Assert
    expect(result).toBeDefined();
    expect(result.errorMessages).toEqual([
      "Room code must be 4 uppercase letters",
    ]);
    expect(result.isSuccessful).toBe(false);
  });

  test("room code is set, but is not just letters, returns unsuccessful", () => {
    // Arrange / Action
    const result = validateRoomCode("A2#$");

    // Assert
    expect(result).toBeDefined();
    expect(result.errorMessages).toEqual([
      "Room code must be 4 uppercase letters",
    ]);
    expect(result.isSuccessful).toBe(false);
  });

  test("room code is set, but is lowercase letters, returns unsuccessful", () => {
    // Arrange / Action
    const result = validateRoomCode("abcd");

    // Assert
    expect(result).toBeDefined();
    expect(result.errorMessages).toEqual([
      "Room code must be 4 uppercase letters",
    ]);
    expect(result.isSuccessful).toBe(false);
  });

  test("room code is set and valid, returns success", () => {
    // Arrange / Action
    const result = validateRoomCode("ABCD");

    // Assert
    expect(result).toBeDefined();
    expect(result.errorMessages).toEqual([]);
    expect(result.isSuccessful).toBe(true);
  });
});

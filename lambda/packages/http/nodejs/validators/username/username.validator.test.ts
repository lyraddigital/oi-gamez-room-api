import { validateUsername } from "./username.validator";

describe("validateUsername tests", () => {
  test("username not set, returns unsuccessful", () => {
    // Arrange / Action
    const result = validateUsername(undefined);

    // Assert
    expect(result).toBeDefined();
    expect(result.errorMessages).toEqual(["Username is required"]);
    expect(result.isSuccessful).toBe(false);
  });

  test("username is set, but only one character, returns unsuccessful", () => {
    // Arrange / Action
    const result = validateUsername("a");

    // Assert
    expect(result).toBeDefined();
    expect(result.errorMessages).toEqual([
      "Username must be at least 2 characters",
    ]);
    expect(result.isSuccessful).toBe(false);
  });

  test("username is set, but more than 12 characters, returns unsuccessful", () => {
    // Arrange / Action
    const result = validateUsername("abcdefghijklm");

    // Assert
    expect(result).toBeDefined();
    expect(result.errorMessages).toEqual([
      "Username must be no more than 12 characters",
    ]);
    expect(result.isSuccessful).toBe(false);
  });

  test("username is set and a valid length, returns success", () => {
    // Arrange / Action
    const result = validateUsername("daryl_duck");

    // Assert
    expect(result).toBeDefined();
    expect(result.errorMessages).toEqual([]);
    expect(result.isSuccessful).toBe(true);
  });

  test("username is set and has character length of 2, returns success", () => {
    // Arrange / Action
    const result = validateUsername("ab");

    // Assert
    expect(result).toBeDefined();
    expect(result.errorMessages).toEqual([]);
    expect(result.isSuccessful).toBe(true);
  });

  test("username is set and has character length of 12, returns success", () => {
    // Arrange / Action
    const result = validateUsername("abcdefghijkl");

    // Assert
    expect(result).toBeDefined();
    expect(result.errorMessages).toEqual([]);
    expect(result.isSuccessful).toBe(true);
  });
});

import { validateGameTypeId } from "./game-type-id.validator";

describe("validateGameTypeId tests", () => {
  test("game type id not set, returns unsuccessful", () => {
    // Arrange / Action
    const result = validateGameTypeId(undefined);

    // Assert
    expect(result).toBeDefined();
    expect(result.errorMessages).toEqual(["Missing game type id."]);
    expect(result.isSuccessful).toBe(false);
  });

  test("game type id is not a number, returns unsuccessful", () => {
    // Arrange / Action
    const result = validateGameTypeId("NaN" as any as number);

    // Assert
    expect(result).toBeDefined();
    expect(result.errorMessages).toEqual([
      "Game type id must be a number and above 0",
    ]);
    expect(result.isSuccessful).toBe(false);
  });

  test("game type id is a negative number, returns unsuccessful", () => {
    // Arrange / Action
    const result = validateGameTypeId(-1);

    // Assert
    expect(result).toBeDefined();
    expect(result.errorMessages).toEqual([
      "Game type id must be a number and above 0",
    ]);
    expect(result.isSuccessful).toBe(false);
  });

  test("game type id is valid number, returns success", () => {
    // Arrange / Action
    const result = validateGameTypeId(1);

    // Assert
    expect(result).toBeDefined();
    expect(result.errorMessages).toEqual([]);
    expect(result.isSuccessful).toBe(true);
  });
});

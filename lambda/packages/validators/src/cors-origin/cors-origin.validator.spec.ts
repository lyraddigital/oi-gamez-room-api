import { validateOrigin } from "./cors-origin.validator";

jest.mock("@oigamez/configuration", () => {
  return {
    CORS_ALLOWED_ORIGINS: "http://localhost,http://www.testsite.com",
  };
});

describe("validateOrigin tests", () => {
  it("origin is not, returns unsuccessful", () => {
    // Arrange / Action
    const result = validateOrigin(undefined);

    // Assert
    expect(result).toBeDefined();
    expect(result.errorMessages).toEqual([
      "Not allowed to access resource. CORS ERROR",
    ]);
    expect(result.isSuccessful).toBe(false);
  });

  it("origin is set and in allowed cors list, returns success", () => {
    // Arrange
    const origin = "http://localhost";

    // Action
    const result = validateOrigin(origin);

    // Assert
    expect(result).toBeDefined();
    expect(result.errorMessages).toEqual([]);
    expect(result.isSuccessful).toBe(true);
  });

  it("origin is set and not in allowed cors list, returns unsuccessful", () => {
    // Arrange
    const origin = "http://www.notallowed.com";

    // Action
    const result = validateOrigin(origin);

    // Assert
    expect(result).toBeDefined();
    expect(result.errorMessages).toEqual([
      "Not allowed to access resource. CORS ERROR",
    ]);
    expect(result.isSuccessful).toBe(false);
  });
});

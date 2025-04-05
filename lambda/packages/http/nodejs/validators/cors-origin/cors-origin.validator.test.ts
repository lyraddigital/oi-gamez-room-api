import { validateOrigin } from "./cors-origin.validator";

describe("validateOrigin tests", () => {
  test("origin is not, returns unsuccessful", () => {
    // Arrange / Action
    const corsAllowedOrigins = "http://localhost,http://www.testsite.com";
    const result = validateOrigin(corsAllowedOrigins, undefined);

    // Assert
    expect(result).toBeDefined();
    expect(result.errorMessages).toEqual([
      "Not allowed to access resource. CORS ERROR",
    ]);
    expect(result.isSuccessful).toBe(false);
  });

  test("origin is set and in allowed cors list, returns success", () => {
    // Arrange
    const corsAllowedOrigins = "http://localhost,http://www.testsite.com";
    const origin = "http://localhost";

    // Action
    const result = validateOrigin(corsAllowedOrigins, origin);

    // Assert
    expect(result).toBeDefined();
    expect(result.errorMessages).toEqual([]);
    expect(result.isSuccessful).toBe(true);
  });

  test("origin is set and not in allowed cors list, returns unsuccessful", () => {
    // Arrange
    const corsAllowedOrigins = "http://localhost,http://www.testsite.com";
    const origin = "http://www.notallowed.com";

    // Action
    const result = validateOrigin(corsAllowedOrigins, origin);

    // Assert
    expect(result).toBeDefined();
    expect(result.errorMessages).toEqual([
      "Not allowed to access resource. CORS ERROR",
    ]);
    expect(result.isSuccessful).toBe(false);
  });
});

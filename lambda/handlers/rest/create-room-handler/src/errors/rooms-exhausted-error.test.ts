import { RoomsExhaustedError } from "./rooms-exhausted-error.js";

describe("RoomsExhaustedError tests", () => {
  test("correct verify mocks were called", () => {
    // Arrange
    const errorMessage = "Test error message";

    const error = new RoomsExhaustedError(errorMessage);

    // Assert
    expect(error.message).toBe(errorMessage);
    expect(error.name).toBe("RoomsExhaustedError");
  });
});

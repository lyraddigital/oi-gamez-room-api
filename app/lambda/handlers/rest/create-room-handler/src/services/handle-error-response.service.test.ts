import { RoomsExhaustedError } from "../errors";
import { handleErrorResponse } from "./handle-error-response.service";

describe("handleErrorResponse tests", () => {
  test("error is a RoomsExhausedError, returns a different error message", () => {
    // Arrange
    const roomExhaustedError = new RoomsExhaustedError("");

    // Action
    const errorMessage = handleErrorResponse(roomExhaustedError);

    // Assert
    expect(errorMessage).toBe(
      "All rooms have been exhausted. Try again later."
    );
  });

  test("error is an other Error, returns a different error message", () => {
    // Arrange
    const generalError = new Error("");

    // Action
    const errorMessage = handleErrorResponse(generalError);

    // Assert
    expect(errorMessage).toBe("Unknown issue while trying to create the room.");
  });
});

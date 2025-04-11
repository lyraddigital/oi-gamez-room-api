import { APIGatewayProxyResult } from "aws-lambda";

import { GameType } from "/opt/nodejs/oigamez-core.js";
import {
  corsOkResponseWithData,
  fatalErrorResponse,
} from "/opt/nodejs/oigamez-http.js";

import { handler } from "./index.js";
import { getAllGameTypes } from "./repositories/index.js";

jest.mock("/opt/nodejs/oigamez-core.js", () => {
  return {
    ...jest.requireActual("/opt/nodejs/oigamez-core.js"),
    CORS_ALLOWED_ORIGINS: "http://localhost:3000",
  };
});
jest.mock("/opt/nodejs/oigamez-data.js");
jest.mock("/opt/nodejs/oigamez-http.js");
jest.mock("./configuration/index.js");
jest.mock("./repositories/index.js");

describe("get game types handler tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("no errors, returns an ok response with game types", async () => {
    // Arrange
    const gameTypes = [{} as GameType];
    const response = {} as APIGatewayProxyResult;
    (
      getAllGameTypes as jest.MockedFunction<typeof getAllGameTypes>
    ).mockResolvedValueOnce(gameTypes);
    (
      corsOkResponseWithData as jest.MockedFunction<
        typeof corsOkResponseWithData
      >
    ).mockReturnValueOnce(response);

    // Action
    const result = await handler();

    // Assert
    expect(result).toBe(response);
    expect(getAllGameTypes).toHaveBeenCalled();
    expect(corsOkResponseWithData).toHaveBeenCalledWith(
      "http://localhost:3000",
      gameTypes
    );
  });

  test("an error is thrown, returns an server error response", async () => {
    // Arrange
    const consoleSpy = jest.spyOn(console, "log");
    const error = new Error("Failed to get game types");
    const response = {} as APIGatewayProxyResult;
    (
      getAllGameTypes as jest.MockedFunction<typeof getAllGameTypes>
    ).mockRejectedValueOnce(error);
    (
      fatalErrorResponse as jest.MockedFunction<typeof fatalErrorResponse>
    ).mockReturnValueOnce(response);

    // Action
    const result = await handler();

    // Assert
    expect(result).toBeDefined();
    expect(fatalErrorResponse).toHaveBeenCalledWith(
      "Unknown issue while trying to get all the game types."
    );
    expect(consoleSpy).toHaveBeenCalledWith(error);
  });
});

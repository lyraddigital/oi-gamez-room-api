import { APIGatewayProxyResult } from "aws-lambda";

import { GameType } from "@oigamez/core";
import { corsOkResponseWithData, fatalErrorResponse } from "@oigamez/http";

import { handler } from ".";
import { getAllGameTypes } from "./repositories";

jest.mock("@oigamez/core", () => {
  return {
    ...jest.requireActual("@oigamez/core"),
    CORS_ALLOWED_ORIGINS: "http://localhost:3000",
  };
});
jest.mock("@oigamez/data");
jest.mock("@oigamez/http");
jest.mock("./configuration");
jest.mock("./repositories");

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

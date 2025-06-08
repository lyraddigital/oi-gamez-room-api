import { corsOkResponseWithData, fatalErrorResponse } from "@oigamez/http";
import { APIGatewayProxyResult } from "aws-lambda";

import { handler } from ".";
import { PublicRoom } from "./models";
import { getPublicRooms } from "./repositories";

jest.mock("@oigamez/core", () => {
  return {
    ...jest.requireActual("@oigamez/core"),
    CORS_ALLOWED_ORIGINS: "http://localhost:3000",
  };
});
jest.mock("@oigamez/http");
jest.mock("./configuration");
jest.mock("./repositories");

describe("get public rooms handler tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("no errors, returns an ok response with game types", async () => {
    // Arrange
    const publicRooms = [{} as PublicRoom];
    const response = {} as APIGatewayProxyResult;
    (
      getPublicRooms as jest.MockedFunction<typeof getPublicRooms>
    ).mockResolvedValueOnce(publicRooms);
    (
      corsOkResponseWithData as jest.MockedFunction<
        typeof corsOkResponseWithData
      >
    ).mockReturnValueOnce(response);

    // Action
    const result = await handler();

    // Assert
    expect(result).toBe(response);
    expect(getPublicRooms).toHaveBeenCalled();
    expect(corsOkResponseWithData).toHaveBeenCalledWith(
      "http://localhost:3000",
      publicRooms
    );
  });

  test("an error is thrown, returns an server error response", async () => {
    // Arrange
    const consoleSpy = jest.spyOn(console, "log");
    const error = new Error("Failed to get game types");
    const response = {} as APIGatewayProxyResult;
    (
      getPublicRooms as jest.MockedFunction<typeof getPublicRooms>
    ).mockRejectedValueOnce(error);
    (
      fatalErrorResponse as jest.MockedFunction<typeof fatalErrorResponse>
    ).mockReturnValueOnce(response);

    // Action
    const result = await handler();

    // Assert
    expect(result).toBeDefined();
    expect(fatalErrorResponse).toHaveBeenCalledWith(
      "Unknown issue while trying to get the public rooms to join"
    );
    expect(consoleSpy).toHaveBeenCalledWith(error);
  });
});

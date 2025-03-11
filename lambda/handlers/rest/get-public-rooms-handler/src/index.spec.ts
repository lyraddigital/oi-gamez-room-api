import { corsOkResponseWithData, fatalErrorResponse } from "@oigamez/responses";
import { APIGatewayProxyResult } from "aws-lambda";

import { PublicRoom } from "./models";
import { getPublicRooms } from "./repositories";
import { handler } from ".";

jest.mock("@oigamez/responses");

jest.mock("./configuration");
jest.mock("./repositories");

describe("get public rooms handler tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("no errors, returns an ok response with game types", async () => {
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
    expect(corsOkResponseWithData).toHaveBeenCalledWith(publicRooms);
  });

  it("an error is thrown, returns an server error response", async () => {
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

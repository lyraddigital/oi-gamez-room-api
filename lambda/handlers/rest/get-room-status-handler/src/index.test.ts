import { VerificationResult } from "@oigamez/models";
import { extractHeader, extractFromPath } from "@oigamez/requests";
import {
  corsBadRequestResponse,
  corsOkResponseWithData,
  fatalErrorResponse,
} from "@oigamez/responses";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { handler } from ".";
import { CurrentRoomStatus } from "./models";
import { processStatusRetrieval, verifyRequestData } from "./services";

jest.mock("@oigamez/requests");
jest.mock("@oigamez/responses");

jest.mock("./configuration");
jest.mock("./services");

describe("create room handler tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("verification of event fails, returns a bad request result", async () => {
    // Arrange
    const origin = "http://localhost:8000";
    const roomCode = "ABCD";
    const verifyRequestDataResult: VerificationResult = {
      isSuccessful: false,
      errorMessages: [],
    };
    const response = {} as APIGatewayProxyResult;
    const event = {} as APIGatewayProxyEvent;
    (
      extractHeader as jest.MockedFunction<typeof extractHeader>
    ).mockReturnValueOnce(origin);
    (
      extractFromPath as jest.MockedFunction<typeof extractFromPath>
    ).mockReturnValueOnce(roomCode);
    (
      verifyRequestData as jest.MockedFunction<typeof verifyRequestData>
    ).mockReturnValueOnce(verifyRequestDataResult);
    (
      corsBadRequestResponse as jest.MockedFunction<
        typeof corsBadRequestResponse
      >
    ).mockReturnValueOnce(response);

    // Action
    const result = await handler(event);

    // Assert
    expect(result).toBe(response);
    expect(extractHeader).toHaveBeenCalledWith(event, "Origin");
    expect(extractFromPath).toHaveBeenCalledWith(event, "roomCode");
    expect(verifyRequestData).toHaveBeenCalledWith(origin, roomCode);
    expect(corsBadRequestResponse).toHaveBeenCalledWith(
      verifyRequestDataResult.errorMessages
    );
  });

  test("verification passes, returns an ok response with room status", async () => {
    // Arrange
    const origin = "http://localhost:8000";
    const roomCode = "ABCD";
    const requestTimeEpoch = 93948485;
    const roomStatus: CurrentRoomStatus = {
      canJoin: false,
      reason: "Room is full",
    };
    const verifyRequestDataResult: VerificationResult = {
      isSuccessful: true,
      errorMessages: [],
    };
    const response = {} as APIGatewayProxyResult;
    const event = {
      requestContext: {
        requestTimeEpoch,
      },
    } as APIGatewayProxyEvent;
    (
      extractHeader as jest.MockedFunction<typeof extractHeader>
    ).mockReturnValueOnce(origin);
    (
      extractFromPath as jest.MockedFunction<typeof extractFromPath>
    ).mockReturnValueOnce(roomCode);
    (
      verifyRequestData as jest.MockedFunction<typeof verifyRequestData>
    ).mockReturnValueOnce(verifyRequestDataResult);
    (
      processStatusRetrieval as jest.MockedFunction<
        typeof processStatusRetrieval
      >
    ).mockResolvedValueOnce(roomStatus);
    (
      corsOkResponseWithData as jest.MockedFunction<
        typeof corsOkResponseWithData
      >
    ).mockReturnValueOnce(response);

    // Action
    const result = await handler(event);

    // Assert
    expect(result).toBe(response);
    expect(extractHeader).toHaveBeenCalledWith(event, "Origin");
    expect(extractFromPath).toHaveBeenCalledWith(event, "roomCode");
    expect(verifyRequestData).toHaveBeenCalledWith(origin, roomCode);
    expect(processStatusRetrieval).toHaveBeenCalledWith(
      roomCode,
      requestTimeEpoch
    );
    expect(corsOkResponseWithData).toHaveBeenCalledWith(roomStatus);
  });

  test("an error is thrown, returns an server error response", async () => {
    // Arrange
    const consoleSpy = jest.spyOn(console, "log");
    const error = new Error("This error is logged");
    const response = {} as APIGatewayProxyResult;
    const event = {} as APIGatewayProxyEvent;
    (
      extractHeader as jest.MockedFunction<typeof extractHeader>
    ).mockImplementationOnce(() => {
      throw error;
    });
    (
      fatalErrorResponse as jest.MockedFunction<typeof fatalErrorResponse>
    ).mockReturnValueOnce(response);

    // Action
    const result = await handler(event);

    // Assert
    expect(result).toBeDefined();
    expect(fatalErrorResponse).toHaveBeenCalledWith(
      "Unknown issue while trying to check the status of a room code."
    );
    expect(consoleSpy).toHaveBeenCalledWith(error);
  });
});

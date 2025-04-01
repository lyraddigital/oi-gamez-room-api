import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { GameType } from "/opt/nodejs/oigamez-core";
import {
  extractHeader,
  parseBody,
  corsBadRequestResponse,
  corsOkResponseWithData,
  fatalErrorResponse,
  VerificationResultWithData,
} from "/opt/nodejs/oigamez-http";
import { handler } from ".";
import { CreateRoomPayload } from "./models";
import { processRoomCreation, verifyRequestData } from "./services";

jest.mock("/opt/nodejs/oigamez-core", () => {
  return {
    ...jest.requireActual("/opt/nodejs/oigamez-core"),
    CORS_ALLOWED_ORIGINS: "http://localhost:3000",
  };
});
jest.mock("/opt/nodejs/oigamez-http");
jest.mock("./configuration");
jest.mock("./services", () => {
  return {
    ...jest.requireActual("./services"),
    processRoomCreation: jest.fn(),
    verifyRequestData: jest.fn(),
  };
});

describe("create room handler tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("verification of event fails, returns a bad request result", async () => {
    // Arrange
    const verifyRequestDataResult: VerificationResultWithData<GameType> = {
      isSuccessful: false,
      errorMessages: ["Some verification error"],
    };
    const response = {} as APIGatewayProxyResult;
    const event = {} as APIGatewayProxyEvent;
    (
      verifyRequestData as jest.MockedFunction<typeof verifyRequestData>
    ).mockResolvedValueOnce(verifyRequestDataResult);
    (
      corsBadRequestResponse as jest.MockedFunction<
        typeof corsBadRequestResponse
      >
    ).mockReturnValueOnce(response);

    // Action
    const result = await handler(event);

    // Assert
    expect(result).toBe(response);
    expect(verifyRequestData).toHaveBeenCalledWith(undefined, undefined);
    expect(corsBadRequestResponse).toHaveBeenCalledWith(
      "http://localhost:3000",
      verifyRequestDataResult.errorMessages
    );
  });

  test("verification passes and room created, returns an ok response with room code", async () => {
    // Arrange
    const roomCode = "ABCD";
    const token = "token292938434848";
    const websocketSessionId = "fjewoifjwioefowifjweoifjo@#$#";
    const origin = "https://localhost:3000";
    const requestTimeEpoch = 22929383;
    const gameType = {} as GameType;
    const payload = {} as CreateRoomPayload;
    const verifyRequestDataResult: VerificationResultWithData<GameType> = {
      isSuccessful: true,
      errorMessages: [],
      data: gameType,
    };
    const response = {} as APIGatewayProxyResult;
    const event = {
      requestContext: {
        requestTimeEpoch: requestTimeEpoch,
      },
    } as APIGatewayProxyEvent;
    (parseBody as jest.MockedFunction<typeof parseBody>).mockReturnValueOnce(
      payload
    );
    (
      extractHeader as jest.MockedFunction<typeof extractHeader>
    ).mockReturnValueOnce(origin);
    (
      verifyRequestData as jest.MockedFunction<typeof verifyRequestData>
    ).mockResolvedValueOnce(verifyRequestDataResult);
    (
      processRoomCreation as jest.MockedFunction<typeof processRoomCreation>
    ).mockResolvedValueOnce({ roomCode, token, websocketSessionId });
    (
      corsOkResponseWithData as jest.MockedFunction<
        typeof corsOkResponseWithData
      >
    ).mockReturnValueOnce(response);

    // Action
    const result = await handler(event);

    // Assert
    expect(result).toBe(response);
    expect(verifyRequestData).toHaveBeenCalledWith(origin, payload);
    expect(processRoomCreation).toHaveBeenCalledWith(
      payload,
      gameType,
      event.requestContext.requestTimeEpoch
    );
    expect(corsOkResponseWithData).toHaveBeenCalledWith(
      "http://localhost:3000",
      {
        roomCode,
        token,
        websocketSessionId,
      }
    );
  });

  test("an error is thrown, returns an server error response", async () => {
    // Arrange
    const consoleSpy = jest.spyOn(console, "log");
    const error = new Error("This error is logged");
    const response = {} as APIGatewayProxyResult;
    const event = {} as APIGatewayProxyEvent;
    (parseBody as jest.MockedFunction<typeof parseBody>).mockImplementationOnce(
      () => {
        throw error;
      }
    );
    (
      fatalErrorResponse as jest.MockedFunction<typeof fatalErrorResponse>
    ).mockReturnValueOnce(response);

    // Action
    const result = await handler(event);

    // Assert
    expect(result).toBeDefined();
    expect(fatalErrorResponse).toHaveBeenCalledWith(
      "Unknown issue while trying to create the room."
    );
    expect(consoleSpy).toHaveBeenCalledWith(error);
  });
});

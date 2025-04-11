import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { Room } from "/opt/nodejs/oigamez-core.js";
import {
  badRequestResponse,
  extractFromQueryString,
  fatalErrorResponse,
  okResponse,
  VerificationResult,
  VerificationResultWithData,
} from "/opt/nodejs/oigamez-http.js";
import { handler } from "./index.js";
import { processRoomConnection, verifyRequestData } from "./services/index.js";

jest.mock("/opt/nodejs/oigamez-http.js");
jest.mock("./configuration/index.js");
jest.mock("./services/index.js");

describe("ensure room connection handler tests", () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleLogSpy = jest.spyOn(console, "log");
  });

  test("verification of event fails, returns a bad request result", async () => {
    // Arrange
    const username = "daryl_duck";
    const roomCode = "ABCD";
    const connectionId = "conn1234";
    const requestTimeEpoch = 3939484;
    const verifyRequestDataResult: VerificationResult = {
      isSuccessful: false,
      errorMessages: [],
    };
    const response = {} as APIGatewayProxyResult;
    const event = {
      requestContext: {
        connectionId,
        requestTimeEpoch,
      },
    } as APIGatewayProxyEvent;
    (
      extractFromQueryString as jest.MockedFunction<
        typeof extractFromQueryString
      >
    )
      .mockReturnValueOnce(username)
      .mockReturnValueOnce(roomCode);
    (
      verifyRequestData as jest.MockedFunction<typeof verifyRequestData>
    ).mockResolvedValueOnce(verifyRequestDataResult);
    (
      badRequestResponse as jest.MockedFunction<typeof badRequestResponse>
    ).mockReturnValueOnce(response);

    // Action
    const result = await handler(event);

    // Assert
    expect(result).toBe(response);
    expect(extractFromQueryString).toHaveBeenNthCalledWith(
      1,
      event,
      "username"
    );
    expect(extractFromQueryString).toHaveBeenNthCalledWith(
      2,
      event,
      "roomCode"
    );
    expect(verifyRequestData).toHaveBeenCalledWith(
      username,
      roomCode,
      requestTimeEpoch
    );
    expect(badRequestResponse).toHaveBeenCalledWith(
      verifyRequestDataResult.errorMessages
    );
    expect(processRoomConnection).not.toHaveBeenCalled();
    expect(okResponse).not.toHaveBeenCalled();
    expect(fatalErrorResponse).not.toHaveBeenCalled();
    expect(consoleLogSpy).not.toHaveBeenCalled();
  });

  test("verification of event passes, returns an ok result", async () => {
    // Arrange
    const username = "daryl_duck";
    const roomCode = "ABCD";
    const connectionId = "conn1234";
    const requestTimeEpoch = 3939484;
    const ttl = 49449495;
    const room = {} as Room;
    const isHost = true;
    const verifyRequestDataResult: VerificationResultWithData<{
      isHost: boolean;
      room: Room;
      ttl: number;
    }> = {
      isSuccessful: true,
      errorMessages: [],
      data: {
        isHost,
        room,
        ttl,
      },
    };
    const response = {} as APIGatewayProxyResult;
    const event = {
      requestContext: {
        connectionId,
        requestTimeEpoch,
      },
    } as APIGatewayProxyEvent;
    (
      extractFromQueryString as jest.MockedFunction<
        typeof extractFromQueryString
      >
    )
      .mockReturnValueOnce(username)
      .mockReturnValueOnce(roomCode);
    (
      verifyRequestData as jest.MockedFunction<typeof verifyRequestData>
    ).mockResolvedValueOnce(verifyRequestDataResult);
    (
      processRoomConnection as jest.MockedFunction<typeof processRoomConnection>
    ).mockResolvedValueOnce();
    (okResponse as jest.MockedFunction<typeof okResponse>).mockReturnValueOnce(
      response
    );

    // Action
    const result = await handler(event);

    // Assert
    expect(result).toBe(response);
    expect(extractFromQueryString).toHaveBeenNthCalledWith(
      1,
      event,
      "username"
    );
    expect(extractFromQueryString).toHaveBeenNthCalledWith(
      2,
      event,
      "roomCode"
    );
    expect(verifyRequestData).toHaveBeenCalledWith(
      username,
      roomCode,
      requestTimeEpoch
    );
    expect(processRoomConnection).toHaveBeenCalledWith(
      room,
      isHost,
      username,
      connectionId,
      ttl
    );
    expect(okResponse).toHaveBeenCalled();
    expect(badRequestResponse).not.toHaveBeenCalled();
    expect(fatalErrorResponse).not.toHaveBeenCalled();
    expect(consoleLogSpy).not.toHaveBeenCalled();
  });

  test("error was thrown, returns an server error response", async () => {
    // Arrange
    const error = new Error("Extract query error");
    const response = {} as APIGatewayProxyResult;
    const event = {} as APIGatewayProxyEvent;
    (
      extractFromQueryString as jest.MockedFunction<
        typeof extractFromQueryString
      >
    ).mockImplementation(() => {
      throw error;
    });
    (
      fatalErrorResponse as jest.MockedFunction<typeof fatalErrorResponse>
    ).mockReturnValueOnce(response);

    // Action
    const result = await handler(event);

    // Assert
    expect(result).toBe(response);
    expect(extractFromQueryString).toHaveBeenNthCalledWith(
      1,
      event,
      "username"
    );
    expect(verifyRequestData).not.toHaveBeenCalled();
    expect(processRoomConnection).not.toHaveBeenCalled();
    expect(okResponse).not.toHaveBeenCalled();
    expect(badRequestResponse).not.toHaveBeenCalled();
    expect(fatalErrorResponse).toHaveBeenCalledWith(
      "Unknown issue while trying to connect the user to the room."
    );
  });
});

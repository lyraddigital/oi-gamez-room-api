import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { Room, RoomConnection } from "/opt/nodejs/oigamez-core";
import {
  corsBadRequestResponse,
  corsOkResponse,
  extractHeader,
  extractFromPath,
  parseBody,
  fatalErrorResponse,
  VerificationResult,
  VerificationResultWithData,
} from "/opt/nodejs/oigamez-http";
import { handler } from ".";
import { LeaveRoomPayload } from "./models";
import { processLeavingRoom, verifyRequestData } from "./services";

jest.mock("/opt/nodejs/oigamez-core", () => {
  return {
    ...jest.requireActual("/opt/nodejs/oigamez-core"),
    CORS_ALLOWED_ORIGINS: "http://localhost:3000",
  };
});
jest.mock("/opt/nodejs/oigamez-http");
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
    const requestTimeEpoch = 93948485;
    const verifyRequestDataResult: VerificationResult = {
      isSuccessful: false,
      errorMessages: [],
    };
    const response = {} as APIGatewayProxyResult;
    const event = {
      requestContext: {
        requestTimeEpoch,
      },
    } as APIGatewayProxyEvent;
    const payload = {} as LeaveRoomPayload;
    (
      extractHeader as jest.MockedFunction<typeof extractHeader>
    ).mockReturnValueOnce(origin);
    (
      extractFromPath as jest.MockedFunction<typeof extractFromPath>
    ).mockReturnValueOnce(roomCode);
    (parseBody as jest.MockedFunction<typeof parseBody>).mockReturnValueOnce(
      payload
    );
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
    expect(extractHeader).toHaveBeenCalledWith(event, "Origin");
    expect(extractFromPath).toHaveBeenCalledWith(event, "roomCode");
    expect(parseBody).toHaveBeenCalledWith(event);
    expect(verifyRequestData).toHaveBeenCalledWith(
      origin,
      roomCode,
      payload,
      requestTimeEpoch
    );
    expect(corsBadRequestResponse).toHaveBeenCalledWith(
      "http://localhost:3000",
      verifyRequestDataResult.errorMessages
    );
  });

  test("verification passes, returns an ok response", async () => {
    // Arrange
    const origin = "http://localhost:8000";
    const roomCode = "ABCD";
    const room = {} as Room;
    const connections = [] as RoomConnection[];
    const requestTimeEpoch = 93948485;
    const verifyRequestDataResult: VerificationResultWithData<
      [Room, RoomConnection[]]
    > = {
      isSuccessful: true,
      errorMessages: [],
      data: [room, connections],
    };
    const response = {} as APIGatewayProxyResult;
    const event = {
      requestContext: {
        requestTimeEpoch,
      },
    } as APIGatewayProxyEvent;
    const payload = {} as LeaveRoomPayload;
    (
      extractHeader as jest.MockedFunction<typeof extractHeader>
    ).mockReturnValueOnce(origin);
    (
      extractFromPath as jest.MockedFunction<typeof extractFromPath>
    ).mockReturnValueOnce(roomCode);
    (parseBody as jest.MockedFunction<typeof parseBody>).mockReturnValueOnce(
      payload
    );
    (
      verifyRequestData as jest.MockedFunction<typeof verifyRequestData>
    ).mockResolvedValueOnce(verifyRequestDataResult);
    (
      corsOkResponse as jest.MockedFunction<typeof corsOkResponse>
    ).mockReturnValueOnce(response);

    // Action
    const result = await handler(event);

    // Assert
    expect(result).toBe(response);
    expect(extractHeader).toHaveBeenCalledWith(event, "Origin");
    expect(extractFromPath).toHaveBeenCalledWith(event, "roomCode");
    expect(parseBody).toHaveBeenCalledWith(event);
    expect(verifyRequestData).toHaveBeenCalledWith(
      origin,
      roomCode,
      payload,
      requestTimeEpoch
    );
    expect(processLeavingRoom).toHaveBeenCalledWith(room, connections, payload);
    expect(corsOkResponse).toHaveBeenCalledWith("http://localhost:3000", 204);
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
      "Unexpected error occurred while trying to leave the room."
    );
    expect(consoleSpy).toHaveBeenCalledWith(error);
  });
});

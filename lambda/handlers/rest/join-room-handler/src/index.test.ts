import { VerificationResult } from "@oigamez/models";
import { extractHeader, extractFromPath, parseBody } from "@oigamez/requests";
import {
  corsBadRequestResponse,
  corsOkResponse,
  corsOkResponseWithData,
  fatalErrorResponse,
} from "@oigamez/responses";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { handler } from ".";
import { JoinRoomPayload } from "./models";
import { processRoomJoin, verifyRequestData } from "./services";

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
    const payload = {} as JoinRoomPayload;
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
      verifyRequestDataResult.errorMessages
    );
    expect(corsOkResponseWithData).not.toHaveBeenCalled();
    expect(fatalErrorResponse).not.toHaveBeenCalled();
  });

  test("verification passes, returns an ok response with correct data", async () => {
    // Arrange
    const origin = "http://localhost:8000";
    const roomCode = "ABCD";
    const accessToken = "adflkjwlfjwwkfjwlkfjk";
    const websocketSessionId = "39320jf29fj30f92f0293";
    const requestTimeEpoch = 93948485;
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
    const payload = {} as JoinRoomPayload;
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
      processRoomJoin as jest.MockedFunction<typeof processRoomJoin>
    ).mockReturnValueOnce({ token: accessToken, websocketSessionId });
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
    expect(parseBody).toHaveBeenCalledWith(event);
    expect(verifyRequestData).toHaveBeenCalledWith(
      origin,
      roomCode,
      payload,
      requestTimeEpoch
    );
    expect(corsOkResponseWithData).toHaveBeenCalledWith({
      token: accessToken,
      websocketSessionId,
    });
    expect(corsBadRequestResponse).not.toHaveBeenCalled();
    expect(fatalErrorResponse).not.toHaveBeenCalled();
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
      "Unexpected error occurred while trying to join the room."
    );
    expect(corsBadRequestResponse).not.toHaveBeenCalled();
    expect(corsOkResponseWithData).not.toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith(error);
  });
});

import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { okResponse } from "@oigamez/http";

import { handler } from ".";
import { processDisconnection } from "./services";

jest.mock("@oigamez/http");
jest.mock("./configuration");
jest.mock("./services");

describe("room disconnection handler tests", () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleLogSpy = jest.spyOn(console, "log");
  });

  test("no error, calls correct mocks and returns ok", async () => {
    // Arrange
    const connectionId = "conn1234";
    const requestTimeEpoch = 3939484;
    const response = {} as APIGatewayProxyResult;
    const event = {
      requestContext: {
        connectionId,
        requestTimeEpoch,
      },
    } as APIGatewayProxyEvent;
    (
      processDisconnection as jest.MockedFunction<typeof processDisconnection>
    ).mockResolvedValueOnce();
    (okResponse as jest.MockedFunction<typeof okResponse>).mockReturnValueOnce(
      response
    );

    // Action
    const result = await handler(event);

    // Assert
    expect(result).toBe(response);
    expect(processDisconnection).toHaveBeenCalledWith(
      connectionId,
      requestTimeEpoch
    );
    expect(okResponse).toHaveBeenCalled();
    expect(consoleLogSpy).not.toHaveBeenCalled();
  });

  test("error thrown, calls correct mocks and returns ok", async () => {
    // Arrange
    const connectionId = "conn1234";
    const requestTimeEpoch = 3939484;
    const error = new Error("Some Error");
    const response = {} as APIGatewayProxyResult;
    const event = {
      requestContext: {
        connectionId,
        requestTimeEpoch,
      },
    } as APIGatewayProxyEvent;
    (
      processDisconnection as jest.MockedFunction<typeof processDisconnection>
    ).mockRejectedValueOnce(error as any);
    (okResponse as jest.MockedFunction<typeof okResponse>).mockReturnValueOnce(
      response
    );

    // Action
    const result = await handler(event);

    // Assert
    expect(result).toBe(response);
    expect(processDisconnection).toHaveBeenCalledWith(
      connectionId,
      requestTimeEpoch
    );
    expect(okResponse).toHaveBeenCalled();
    expect(consoleLogSpy).toHaveBeenCalledWith(error);
  });
});

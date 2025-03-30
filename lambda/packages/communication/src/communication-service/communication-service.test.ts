import {
  PostToConnectionCommand,
  DeleteConnectionCommand,
} from "@aws-sdk/client-apigatewaymanagementapi";

import { client } from "../client";
import { broadcast, closeConnection } from "./communication-service";

describe("communication service tests", () => {
  const logSpy = jest.spyOn(console, "log");
  const sendSpy = jest.spyOn(client, "send");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("broadcast tests", () => {
    test("one of the connections raises an error, error logged and all other connections are broadcasted", async () => {
      // Arrange
      const someError = { errorMessage: "Some error" };
      const connectionIds: string[] = ["conn123", "conn456", "conn789"];
      const payload = { prop: "value" };

      sendSpy
        .mockReturnValueOnce({} as any)
        .mockRejectedValueOnce(someError as never)
        .mockReturnValueOnce({} as any);

      // Action
      await broadcast(connectionIds, payload);

      // Assert
      expect(sendSpy.mock.calls.length).toBe(3);
      expect(
        (sendSpy.mock.calls[0][0] as PostToConnectionCommand).input.ConnectionId
      ).toBe(connectionIds[0]);
      expect(
        (sendSpy.mock.calls[0][0] as PostToConnectionCommand).input.Data
      ).toEqual(JSON.stringify(payload));
      expect(
        (sendSpy.mock.calls[1][0] as PostToConnectionCommand).input.ConnectionId
      ).toBe(connectionIds[1]);
      expect(
        (sendSpy.mock.calls[1][0] as PostToConnectionCommand).input.Data
      ).toEqual(JSON.stringify(payload));
      expect(
        (sendSpy.mock.calls[2][0] as PostToConnectionCommand).input.ConnectionId
      ).toBe(connectionIds[2]);
      expect(
        (sendSpy.mock.calls[2][0] as PostToConnectionCommand).input.Data
      ).toEqual(JSON.stringify(payload));
      expect(logSpy).toHaveBeenCalledWith(
        "Error while trying to send a communication message to a socket",
        someError
      );
    });

    test("one of the connections is missing a connectionId, does not process that connection", async () => {
      // Arrange
      const connectionIds: string[] = ["conn123", "", "conn789"];
      const payload = { prop: "value" };

      sendSpy.mockReturnValueOnce({} as any).mockReturnValueOnce({} as any);

      // Action
      await broadcast(connectionIds, payload);

      // Assert
      expect(sendSpy.mock.calls.length).toBe(2);
      expect(
        (sendSpy.mock.calls[0][0] as PostToConnectionCommand).input.ConnectionId
      ).toBe(connectionIds[0]);
      expect(
        (sendSpy.mock.calls[1][0] as PostToConnectionCommand).input.ConnectionId
      ).toBe(connectionIds[2]);
    });

    test("payload is undefined, does not process any connections", async () => {
      // Arrange
      const connectionIds: string[] = ["conn123", "conn456", "conn789"];

      // Action
      await broadcast(connectionIds, undefined);

      // Assert
      expect(sendSpy.mock.calls.length).toBe(0);
    });
  });

  describe("closeConnection tests", () => {
    test("connection id is not set, does not attempt to close the connection", async () => {
      // Arrange / Action
      await closeConnection(undefined as unknown as string);

      // Assert
      expect(sendSpy.mock.calls.length).toBe(0);
    });

    test("connection id is set, but client throws an error, error is captured and no error is returned", async () => {
      // Arrange
      const someError = { errorMessage: "Some error" };
      const connectionId = "conn123";

      sendSpy.mockRejectedValueOnce(someError as never);

      // Action
      await closeConnection(connectionId);

      // Assert
      expect(sendSpy.mock.calls.length).toBe(1);
      expect(
        (sendSpy.mock.calls[0][0] as DeleteConnectionCommand).input.ConnectionId
      ).toBe(connectionId);
      expect(logSpy).toHaveBeenCalledWith(
        "Error while trying to delete connection",
        someError
      );
    });

    test("connection id is set, and client does not throw an error, call is executed succcessfully", async () => {
      // Arrange
      const connectionId = "conn123";

      sendSpy.mockReturnValueOnce({} as any);

      // Action
      await closeConnection(connectionId);

      // Assert
      expect(sendSpy.mock.calls.length).toBe(1);
      expect((sendSpy.mock.calls[0][0].input as any).ConnectionId).toBe(
        connectionId
      );
    });
  });
});

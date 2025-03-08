import {
  PostToConnectionCommand,
  DeleteConnectionCommand,
} from "@aws-sdk/client-apigatewaymanagementapi";
import { RoomConnection } from "@oigamez/models";

import { client } from "../client";
import { broadcast, closeConnection } from "./communication-service";

describe("communication service tests", () => {
  const logSpy = jest.spyOn(console, "log");
  const sendSpy = jest.spyOn(client, "send");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("broadcast tests", () => {
    it("one of the connections raises an error, error logged and all other connections are broadcasted", async () => {
      // Arrange
      const someError = { errorMessage: "Some error" };
      const connections: RoomConnection[] = [
        { connectionId: "conn123" } as RoomConnection,
        { connectionId: "conn456" } as RoomConnection,
        { connectionId: "conn789" } as RoomConnection,
      ];
      const payload = { prop: "value" };

      sendSpy
        .mockReturnValueOnce({} as any)
        .mockRejectedValueOnce(someError as never)
        .mockReturnValueOnce({} as any);

      // Action
      await broadcast(connections, payload);

      // Assert
      expect(sendSpy.mock.calls.length).toBe(3);
      expect(
        (sendSpy.mock.calls[0][0] as PostToConnectionCommand).input.ConnectionId
      ).toBe(connections[0].connectionId);
      expect(
        (sendSpy.mock.calls[0][0] as PostToConnectionCommand).input.Data
      ).toEqual(JSON.stringify(payload));
      expect(
        (sendSpy.mock.calls[1][0] as PostToConnectionCommand).input.ConnectionId
      ).toBe(connections[1].connectionId);
      expect(
        (sendSpy.mock.calls[1][0] as PostToConnectionCommand).input.Data
      ).toEqual(JSON.stringify(payload));
      expect(
        (sendSpy.mock.calls[2][0] as PostToConnectionCommand).input.ConnectionId
      ).toBe(connections[2].connectionId);
      expect(
        (sendSpy.mock.calls[2][0] as PostToConnectionCommand).input.Data
      ).toEqual(JSON.stringify(payload));
      expect(logSpy).toHaveBeenCalledWith(
        "Error while trying to send a communication message to a socket",
        someError
      );
    });

    it("one of the connections is missing a connectionId, does not process that connection", async () => {
      // Arrange
      const connections: RoomConnection[] = [
        { connectionId: "conn123" } as RoomConnection,
        {} as RoomConnection,
        { connectionId: "conn789" } as RoomConnection,
      ];
      const payload = { prop: "value" };

      sendSpy.mockReturnValueOnce({} as any).mockReturnValueOnce({} as any);

      // Action
      await broadcast(connections, payload);

      // Assert
      expect(sendSpy.mock.calls.length).toBe(2);
      expect(
        (sendSpy.mock.calls[0][0] as PostToConnectionCommand).input.ConnectionId
      ).toBe(connections[0].connectionId);
      expect(
        (sendSpy.mock.calls[1][0] as PostToConnectionCommand).input.ConnectionId
      ).toBe(connections[2].connectionId);
    });

    it("payload is undefined, does not process any connections", async () => {
      // Arrange
      const connections: RoomConnection[] = [
        { connectionId: "conn123" } as RoomConnection,
        { connectionId: "conn456" } as RoomConnection,
        { connectionId: "conn789" } as RoomConnection,
      ];

      // Action
      await broadcast(connections, undefined);

      // Assert
      expect(sendSpy.mock.calls.length).toBe(0);
    });
  });

  describe("closeConnection tests", () => {
    it("connection id is not set, does not attempt to close the connection", async () => {
      // Arrange / Action
      await closeConnection(undefined as unknown as string);

      // Assert
      expect(sendSpy.mock.calls.length).toBe(0);
    });

    it("connection id is set, but client throws an error, error is captured and no error is returned", async () => {
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

    it("connection id is set, and client does not throw an error, call is executed succcessfully", async () => {
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

import { PostToConnectionCommand } from "@aws-sdk/client-apigatewaymanagementapi";
import { DeleteConnectionCommand } from "@aws-sdk/client-eventbridge";
import { RoomConnection } from "@oigamez/models";

describe("communication service tests", () => {
  let sendFn = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.mock("../client", () => {
      return {
        client: {
          send: sendFn,
        },
      };
    });
  });

  describe("broadcast tests", () => {
    it("one of the connections raises an error, error logged and all other connections are broadcasted", async () => {
      // Arrange
      const connections: RoomConnection[] = [
        { connectionId: "conn123" } as RoomConnection,
        { connectionId: "conn456" } as RoomConnection,
        { connectionId: "conn789" } as RoomConnection,
      ];
      const payload = { prop: "value" };

      sendFn
        .mockImplementationOnce(() => Promise.resolve())
        .mockImplementationOnce(() => Promise.reject())
        .mockImplementationOnce(() => Promise.resolve());

      const { broadcast } = await import("./communication-service");

      // Action / Assert
      expect(async () => await broadcast(connections, payload)).not.toThrow();

      expect(sendFn.mock.calls.length).toBe(3);
      expect(
        (sendFn.mock.calls[0][0] as PostToConnectionCommand).input.ConnectionId
      ).toBe(connections[0].connectionId);
      expect(
        (sendFn.mock.calls[0][0] as PostToConnectionCommand).input.Data
      ).toEqual(JSON.stringify(payload));
      expect(
        (sendFn.mock.calls[1][0] as PostToConnectionCommand).input.ConnectionId
      ).toBe(connections[1].connectionId);
      expect(
        (sendFn.mock.calls[1][0] as PostToConnectionCommand).input.Data
      ).toEqual(JSON.stringify(payload));
      expect(
        (sendFn.mock.calls[2][0] as PostToConnectionCommand).input.ConnectionId
      ).toBe(connections[2].connectionId);
      expect(
        (sendFn.mock.calls[2][0] as PostToConnectionCommand).input.Data
      ).toEqual(JSON.stringify(payload));
    });

    it("one of the connections is missing a connectionId, does not process that connection", async () => {
      // Arrange
      const connections: RoomConnection[] = [
        { connectionId: "conn123" } as RoomConnection,
        {} as RoomConnection,
        { connectionId: "conn789" } as RoomConnection,
      ];
      const payload = { prop: "value" };

      sendFn
        .mockImplementationOnce(() => Promise.resolve())
        .mockImplementationOnce(() => Promise.resolve())
        .mockImplementationOnce(() => Promise.resolve());

      const { broadcast } = await import("./communication-service");

      // Action
      await broadcast(connections, payload);

      expect(sendFn.mock.calls.length).toBe(2);
      expect(
        (sendFn.mock.calls[0][0] as PostToConnectionCommand).input.ConnectionId
      ).toBe(connections[0].connectionId);
      expect(
        (sendFn.mock.calls[1][0] as PostToConnectionCommand).input.ConnectionId
      ).toBe(connections[2].connectionId);
    });

    it("payload is undefined, does not process any connections", async () => {
      // Arrange
      const connections: RoomConnection[] = [
        { connectionId: "conn123" } as RoomConnection,
        { connectionId: "conn456" } as RoomConnection,
        { connectionId: "conn789" } as RoomConnection,
      ];

      sendFn
        .mockImplementationOnce(() => Promise.resolve())
        .mockImplementationOnce(() => Promise.resolve())
        .mockImplementationOnce(() => Promise.resolve());

      const { broadcast } = await import("./communication-service");

      // Action
      await broadcast(connections, undefined);

      // Assert
      expect(sendFn.mock.calls.length).toBe(0);
    });
  });

  describe("closeConnection tests", () => {
    it("connection id is not set, does not attempt to close the connection", async () => {
      // Arrange
      sendFn.mockImplementationOnce(() => Promise.resolve());

      const { closeConnection } = await import("./communication-service");

      // Action / Assert
      expect(
        async () => await closeConnection(undefined as unknown as string)
      ).not.toThrow();

      expect(sendFn.mock.calls.length).toBe(0);
    });

    it("connection id is set, but client throws an error, error is captured and no error is returned", async () => {
      // Arrange
      const connectionId = "conn123";

      sendFn.mockImplementationOnce(() => Promise.reject());

      const { closeConnection } = await import("./communication-service");

      // Action / Assert
      expect(async () => await closeConnection(connectionId)).not.toThrow();

      expect(sendFn.mock.calls.length).toBe(1);
      expect(
        ((sendFn.mock.calls[0][0] as DeleteConnectionCommand).input as any)
          .ConnectionId
      ).toBe(connectionId);
    });

    it("connection id is set, and client does not throw an error, call is executed succcessfully", async () => {
      // Arrange
      const connectionId = "conn123";

      sendFn.mockImplementationOnce(() => Promise.reject());

      const { closeConnection } = await import("./communication-service");

      // Action / Assert
      expect(async () => await closeConnection(connectionId)).not.toThrow();

      expect(sendFn.mock.calls.length).toBe(1);
      expect(
        ((sendFn.mock.calls[0][0] as DeleteConnectionCommand).input as any)
          .ConnectionId
      ).toBe(connectionId);
    });
  });
});

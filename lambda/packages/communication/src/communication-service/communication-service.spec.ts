import { PostToConnectionCommand } from "@aws-sdk/client-apigatewaymanagementapi";
import { RoomConnection } from "@oigamez/models";

describe("broadcast tests", () => {
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

  it("one of the connections raises an error, error ignored and all other connections are broadcasted", async () => {
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

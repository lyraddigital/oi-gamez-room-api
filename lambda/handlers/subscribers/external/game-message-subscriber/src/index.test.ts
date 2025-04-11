import { EventBridgeEvent } from "aws-lambda";

import { Room, RoomConnection, RoomStatus } from "/opt/nodejs/oigamez-core.js";
import { broadcast } from "/opt/nodejs/oigamez-communication.js";
import { getRoomConnections, getRoomByCode } from "/opt/nodejs/oigamez-data.js";
import { getConnectionIdsFromConnections } from "/opt/nodejs/oigamez-services.js";
import { handler } from "./index.js";
import {
  GameMessageWebsocketEvent,
  GameMessageEventReceivedEvent,
} from "./models/index.js";

jest.mock("/opt/nodejs/oigamez-communication.js", () => {
  return {
    ...jest.requireActual("/opt/nodejs/oigamez-communication.js"),
    broadcast: jest.fn(),
  };
});
jest.mock("/opt/nodejs/oigamez-data.js");
jest.mock("/opt/nodejs/oigamez-services.js");
jest.mock("./configuration/index.js");
jest.mock("./services/index.js");

describe("game message subscriber handler tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("does not send the message when the room does not exist", async () => {
    // Arrange
    const roomCode = "ABCD";
    const action = "someAction";
    const payload = {} as unknown;
    const event = {
      detail: {
        roomCode,
        action,
        payload,
      },
    } as EventBridgeEvent<
      "room-receive.game-message",
      GameMessageEventReceivedEvent
    >;

    (
      getRoomByCode as jest.MockedFunction<typeof getRoomByCode>
    ).mockResolvedValueOnce(undefined);

    // Action
    await handler(event);

    // Assert
    expect(getRoomByCode).toHaveBeenCalledWith(roomCode);
    expect(broadcast).not.toHaveBeenCalled();
    expect(getRoomConnections).not.toHaveBeenCalled();
    expect(getConnectionIdsFromConnections).not.toHaveBeenCalled();
  });

  test("does not send the message when the room has a not available status", async () => {
    // Arrange
    const roomCode = "ABCD";
    const action = "someAction";
    const payload = {} as unknown;
    const room = {
      status: RoomStatus.notAvailable,
    } as Room;
    const event = {
      detail: {
        roomCode,
        action,
        payload,
      },
    } as EventBridgeEvent<
      "room-receive.game-message",
      GameMessageEventReceivedEvent
    >;

    (
      getRoomByCode as jest.MockedFunction<typeof getRoomByCode>
    ).mockResolvedValueOnce(room);

    // Action
    await handler(event);

    // Assert
    expect(getRoomByCode).toHaveBeenCalledWith(roomCode);
    expect(broadcast).not.toHaveBeenCalled();
    expect(getRoomConnections).not.toHaveBeenCalled();
    expect(getConnectionIdsFromConnections).not.toHaveBeenCalled();
  });

  test("does not send the message when the room has a completed status", async () => {
    // Arrange
    const roomCode = "ABCD";
    const action = "someAction";
    const payload = {} as unknown;
    const room = {
      status: RoomStatus.completed,
    } as Room;
    const event = {
      detail: {
        roomCode,
        action,
        payload,
      },
    } as EventBridgeEvent<
      "room-receive.game-message",
      GameMessageEventReceivedEvent
    >;

    (
      getRoomByCode as jest.MockedFunction<typeof getRoomByCode>
    ).mockResolvedValueOnce(room);

    // Action
    await handler(event);

    // Assert
    expect(getRoomByCode).toHaveBeenCalledWith(roomCode);
    expect(broadcast).not.toHaveBeenCalled();
    expect(getRoomConnections).not.toHaveBeenCalled();
    expect(getConnectionIdsFromConnections).not.toHaveBeenCalled();
  });

  test("does send the message when the room has an available status", async () => {
    // Arrange
    const roomCode = "ABCD";
    const action = "someAction";
    const payload = {} as unknown;
    const roomConnections = [] as RoomConnection[];
    const connectionIds = [] as string[];
    const room = {
      status: RoomStatus.available,
    } as Room;
    const event = {
      detail: {
        roomCode,
        action,
        payload,
      },
    } as EventBridgeEvent<
      "room-receive.game-message",
      GameMessageEventReceivedEvent
    >;

    (
      getRoomByCode as jest.MockedFunction<typeof getRoomByCode>
    ).mockResolvedValueOnce(room);

    (
      getRoomConnections as jest.MockedFunction<typeof getRoomConnections>
    ).mockResolvedValueOnce(roomConnections);

    (
      getConnectionIdsFromConnections as jest.MockedFunction<
        typeof getConnectionIdsFromConnections
      >
    ).mockReturnValueOnce(connectionIds);

    // Action
    await handler(event);

    // Assert
    expect(getRoomConnections).toHaveBeenCalledWith(roomCode);
    expect(getRoomByCode).toHaveBeenCalledWith(roomCode);
    expect(getConnectionIdsFromConnections).toHaveBeenCalledWith(
      roomConnections
    );
    expect(broadcast).toHaveBeenCalled();
    expect(
      (broadcast as jest.MockedFunction<typeof broadcast>).mock
        .calls[0][0] as string[]
    ).toEqual(connectionIds);
    expect(
      (
        (broadcast as jest.MockedFunction<typeof broadcast>).mock
          .calls[0][1] as GameMessageWebsocketEvent
      ).action
    ).toBe(action);
    expect(
      (
        (broadcast as jest.MockedFunction<typeof broadcast>).mock
          .calls[0][1] as GameMessageWebsocketEvent
      ).payload
    ).toBe(payload);
  });

  test("does send the message when the room has an in progress status", async () => {
    // Arrange
    const roomCode = "ABCD";
    const action = "someAction";
    const payload = {} as unknown;
    const roomConnections = [] as RoomConnection[];
    const connectionIds = [] as string[];
    const room = {
      status: RoomStatus.inProgress,
    } as Room;
    const event = {
      detail: {
        roomCode,
        action,
        payload,
      },
    } as EventBridgeEvent<
      "room-receive.game-message",
      GameMessageEventReceivedEvent
    >;

    (
      getRoomByCode as jest.MockedFunction<typeof getRoomByCode>
    ).mockResolvedValueOnce(room);

    (
      getRoomConnections as jest.MockedFunction<typeof getRoomConnections>
    ).mockResolvedValueOnce(roomConnections);

    (
      getConnectionIdsFromConnections as jest.MockedFunction<
        typeof getConnectionIdsFromConnections
      >
    ).mockReturnValueOnce(connectionIds);

    // Action
    await handler(event);

    // Assert
    expect(getRoomConnections).toHaveBeenCalledWith(roomCode);
    expect(getRoomByCode).toHaveBeenCalledWith(roomCode);
    expect(getConnectionIdsFromConnections).toHaveBeenCalledWith(
      roomConnections
    );
    expect(broadcast).toHaveBeenCalled();
    expect(
      (broadcast as jest.MockedFunction<typeof broadcast>).mock
        .calls[0][0] as string[]
    ).toEqual(connectionIds);
    expect(
      (
        (broadcast as jest.MockedFunction<typeof broadcast>).mock
          .calls[0][1] as GameMessageWebsocketEvent
      ).action
    ).toBe(action);
    expect(
      (
        (broadcast as jest.MockedFunction<typeof broadcast>).mock
          .calls[0][1] as GameMessageWebsocketEvent
      ).payload
    ).toBe(payload);
  });
});

import { EventBridgeEvent } from "aws-lambda";

import { Room, RoomConnection, RoomStatus } from "@oigamez/core";
import { broadcast } from "@oigamez/communication";
import { getRoomConnections, getRoomByCode } from "@oigamez/data";
import { getConnectionIdsFromConnections } from "@oigamez/services";
import { handler } from ".";
import {
  GameMessageWebsocketEvent,
  GameMessageEventReceivedEvent,
} from "./models";

jest.mock("@oigamez/communication", () => {
  return {
    ...jest.requireActual("@oigamez/communication"),
    broadcast: jest.fn(),
  };
});
jest.mock("@oigamez/data");
jest.mock("@oigamez/services");
jest.mock("./configuration");
jest.mock("./services");

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

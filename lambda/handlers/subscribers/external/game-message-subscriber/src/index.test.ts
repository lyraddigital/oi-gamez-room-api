import {
  GameStartedCommunicationEvent,
  GenericCommunicationEvent,
  broadcast,
} from "@oigamez/communication";
import {
  EventBridgeReceivedEventType,
  GameMessageEvent,
} from "@oigamez/event-bridge";
import {
  getRoomConnections,
  getRoomByCode,
  updateRoomStatus,
} from "@oigamez/repositories";
import { EventBridgeEvent } from "aws-lambda";

import { handler } from ".";
import { Room, RoomConnection, RoomStatus } from "@oigamez/models";

jest.mock("@oigamez/communication", () => {
  return {
    ...jest.requireActual("@oigamez/communication"),
    broadcast: jest.fn(),
  };
});
jest.mock("@oigamez/repositories");
jest.mock("./configuration");

describe("game message subscriber handler tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("does not send the message when the room does not exist", async () => {
    // Arrange
    const roomCode = "ABCD";
    const action = "someAction";
    const payload = {} as unknown;
    const roomConnections = [] as RoomConnection[];
    const event = {
      detail: {
        roomCode,
        action,
        payload,
      },
    } as EventBridgeEvent<
      EventBridgeReceivedEventType.gameMessage,
      GameMessageEvent
    >;

    (
      getRoomByCode as jest.MockedFunction<typeof getRoomByCode>
    ).mockResolvedValueOnce(undefined);

    (
      getRoomConnections as jest.MockedFunction<typeof getRoomConnections>
    ).mockResolvedValueOnce(roomConnections);

    // Action
    await handler(event);

    // Assert
    expect(getRoomConnections).toHaveBeenCalledWith(roomCode);
    expect(getRoomByCode).toHaveBeenCalledWith(roomCode);
    expect(broadcast).not.toHaveBeenCalled();
  });

  test("does not send the message when the room has a not available status", async () => {
    // Arrange
    const roomCode = "ABCD";
    const action = "someAction";
    const payload = {} as unknown;
    const roomConnections = [] as RoomConnection[];
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
      EventBridgeReceivedEventType.gameMessage,
      GameMessageEvent
    >;

    (
      getRoomByCode as jest.MockedFunction<typeof getRoomByCode>
    ).mockResolvedValueOnce(room);

    (
      getRoomConnections as jest.MockedFunction<typeof getRoomConnections>
    ).mockResolvedValueOnce(roomConnections);

    // Action
    await handler(event);

    // Assert
    expect(getRoomConnections).toHaveBeenCalledWith(roomCode);
    expect(getRoomByCode).toHaveBeenCalledWith(roomCode);
    expect(broadcast).not.toHaveBeenCalled();
  });

  test("does not send the message when the room has a completed status", async () => {
    // Arrange
    const roomCode = "ABCD";
    const action = "someAction";
    const payload = {} as unknown;
    const roomConnections = [] as RoomConnection[];
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
      EventBridgeReceivedEventType.gameMessage,
      GameMessageEvent
    >;

    (
      getRoomByCode as jest.MockedFunction<typeof getRoomByCode>
    ).mockResolvedValueOnce(room);

    (
      getRoomConnections as jest.MockedFunction<typeof getRoomConnections>
    ).mockResolvedValueOnce(roomConnections);

    // Action
    await handler(event);

    // Assert
    expect(getRoomConnections).toHaveBeenCalledWith(roomCode);
    expect(getRoomByCode).toHaveBeenCalledWith(roomCode);
    expect(broadcast).not.toHaveBeenCalled();
  });

  test("does send the message when the room has an available status", async () => {
    // Arrange
    const roomCode = "ABCD";
    const action = "someAction";
    const payload = {} as unknown;
    const roomConnections = [] as RoomConnection[];
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
      EventBridgeReceivedEventType.gameMessage,
      GameMessageEvent
    >;

    (
      getRoomByCode as jest.MockedFunction<typeof getRoomByCode>
    ).mockResolvedValueOnce(room);

    (
      getRoomConnections as jest.MockedFunction<typeof getRoomConnections>
    ).mockResolvedValueOnce(roomConnections);

    // Action
    await handler(event);

    // Assert
    expect(getRoomConnections).toHaveBeenCalledWith(roomCode);
    expect(getRoomByCode).toHaveBeenCalledWith(roomCode);
    expect(broadcast).toHaveBeenCalled();
    expect(
      (broadcast as jest.MockedFunction<typeof broadcast>).mock
        .calls[0][0] as RoomConnection[]
    ).toEqual(roomConnections);
    expect(
      (
        (broadcast as jest.MockedFunction<typeof broadcast>).mock
          .calls[0][1] as GenericCommunicationEvent
      ).action
    ).toBe(action);
    expect(
      (
        (broadcast as jest.MockedFunction<typeof broadcast>).mock
          .calls[0][1] as GenericCommunicationEvent
      ).payload
    ).toBe(payload);
  });

  test("does send the message when the room has an in progress status", async () => {
    // Arrange
    const roomCode = "ABCD";
    const action = "someAction";
    const payload = {} as unknown;
    const roomConnections = [] as RoomConnection[];
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
      EventBridgeReceivedEventType.gameMessage,
      GameMessageEvent
    >;

    (
      getRoomByCode as jest.MockedFunction<typeof getRoomByCode>
    ).mockResolvedValueOnce(room);

    (
      getRoomConnections as jest.MockedFunction<typeof getRoomConnections>
    ).mockResolvedValueOnce(roomConnections);

    // Action
    await handler(event);

    // Assert
    expect(getRoomConnections).toHaveBeenCalledWith(roomCode);
    expect(getRoomByCode).toHaveBeenCalledWith(roomCode);
    expect(broadcast).toHaveBeenCalled();
    expect(
      (broadcast as jest.MockedFunction<typeof broadcast>).mock
        .calls[0][0] as RoomConnection[]
    ).toEqual(roomConnections);
    expect(
      (
        (broadcast as jest.MockedFunction<typeof broadcast>).mock
          .calls[0][1] as GenericCommunicationEvent
      ).action
    ).toBe(action);
    expect(
      (
        (broadcast as jest.MockedFunction<typeof broadcast>).mock
          .calls[0][1] as GenericCommunicationEvent
      ).payload
    ).toBe(payload);
  });
});

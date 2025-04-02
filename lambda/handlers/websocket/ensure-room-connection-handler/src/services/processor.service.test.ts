import {
  UserJoinedInternalEventBridgeEvent,
  publishExternalEvents,
  publishInternalEvents,
} from "/opt/nodejs/oigamez-communication";

import { Room, RoomConnection, RoomStatus } from "/opt/nodejs/oigamez-core";
import { RoomCreatedExternalEvent } from "../models";
import {
  establishHostConnection,
  establishJoinerConnection,
  getRoomConnection,
} from "../repositories";
import { processRoomConnection } from "./processor.service";

jest.mock("/opt/nodejs/oigamez-communication", () => {
  return {
    ...jest.requireActual("/opt/nodejs/oigamez-communication"),
    publishExternalEvents: jest.fn(),
    publishInternalEvents: jest.fn(),
  };
});
jest.mock("../repositories");

describe("processRoomConnection for ensure room connection tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("user is host, and room status is not yet available, makes the correct calls", async () => {
    // Arrange
    const roomCode = "ABCD";
    const username = "daryl_duck";
    const connectionId = "con1234";
    const isHost = true;
    const gameTypeId = 1;
    const roomStatus = RoomStatus.notAvailable;
    const ttl = 2293848;
    const room = {
      code: roomCode,
      status: roomStatus,
      gameTypeId,
    } as Room;

    (
      establishHostConnection as jest.MockedFunction<
        typeof establishHostConnection
      >
    ).mockResolvedValueOnce();
    (
      publishExternalEvents as jest.MockedFunction<typeof publishExternalEvents>
    ).mockResolvedValueOnce();

    // Action
    await processRoomConnection(room, isHost, username, connectionId, ttl);

    // Assert
    expect(getRoomConnection).not.toHaveBeenCalled();
    expect(establishJoinerConnection).not.toHaveBeenCalled();
    expect(publishInternalEvents).not.toHaveBeenCalled();
    expect(establishHostConnection).toHaveBeenCalledWith(
      room,
      username,
      connectionId,
      true,
      ttl
    );
    expect(publishExternalEvents).toHaveBeenCalled();
    expect(
      (
        (
          publishExternalEvents as jest.MockedFunction<
            typeof publishExternalEvents
          >
        ).mock.calls[0][0][0] as RoomCreatedExternalEvent
      ).detailType
    ).toBe("room.room-created");
    expect(
      (
        (
          publishExternalEvents as jest.MockedFunction<
            typeof publishExternalEvents
          >
        ).mock.calls[0][0][0] as RoomCreatedExternalEvent
      ).gameTypeId
    ).toBe(gameTypeId);
    expect(
      (
        (
          publishExternalEvents as jest.MockedFunction<
            typeof publishExternalEvents
          >
        ).mock.calls[0][0][0] as RoomCreatedExternalEvent
      ).hostUsername
    ).toBe(username);
    expect(
      (
        (
          publishExternalEvents as jest.MockedFunction<
            typeof publishExternalEvents
          >
        ).mock.calls[0][0][0] as RoomCreatedExternalEvent
      ).roomCode
    ).toBe(roomCode);
  });

  test("user is host, and room status is available, makes the correct calls", async () => {
    // Arrange
    const roomCode = "ABCD";
    const username = "daryl_duck";
    const connectionId = "con1234";
    const isHost = true;
    const gameTypeId = 1;
    const roomStatus = RoomStatus.available;
    const ttl = 2293848;
    const room = {
      code: roomCode,
      status: roomStatus,
      gameTypeId,
    } as Room;

    (
      establishHostConnection as jest.MockedFunction<
        typeof establishHostConnection
      >
    ).mockResolvedValueOnce();

    // Action
    await processRoomConnection(room, isHost, username, connectionId, ttl);

    // Assert
    expect(getRoomConnection).not.toHaveBeenCalled();
    expect(establishJoinerConnection).not.toHaveBeenCalled();
    expect(publishInternalEvents).not.toHaveBeenCalled();
    expect(publishExternalEvents).not.toHaveBeenCalled();
    expect(establishHostConnection).toHaveBeenCalledWith(
      room,
      username,
      connectionId,
      false,
      ttl
    );
  });

  test("user is not the host, the room is available, and this is a new connection, makes the correct calls", async () => {
    // Arrange
    const roomCode = "ABCD";
    const username = "daryl_duck";
    const connectionId = "con1234";
    const isHost = false;
    const gameTypeId = 1;
    const roomStatus = RoomStatus.available;
    const ttl = 3934294309;
    const room = {
      code: roomCode,
      status: roomStatus,
      gameTypeId,
    } as Room;

    (
      getRoomConnection as jest.MockedFunction<typeof getRoomConnection>
    ).mockResolvedValueOnce(undefined);
    (
      publishInternalEvents as jest.MockedFunction<typeof publishInternalEvents>
    ).mockResolvedValueOnce();

    // Action
    await processRoomConnection(room, isHost, username, connectionId, ttl);

    // Assert
    expect(establishHostConnection).not.toHaveBeenCalled();
    expect(publishExternalEvents).not.toHaveBeenCalled();
    expect(getRoomConnection).toHaveBeenCalledWith(roomCode, username);
    expect(establishJoinerConnection).toHaveBeenCalledWith(
      room,
      username,
      connectionId
    );
    expect(publishInternalEvents).toHaveBeenCalled();
    expect(
      (
        (
          publishInternalEvents as jest.MockedFunction<
            typeof publishInternalEvents
          >
        ).mock.calls[0][0][0] as UserJoinedInternalEventBridgeEvent
      ).detailType
    ).toBe("room-internal.user-joined");
    expect(
      (
        (
          publishInternalEvents as jest.MockedFunction<
            typeof publishInternalEvents
          >
        ).mock.calls[0][0][0] as UserJoinedInternalEventBridgeEvent
      ).gameTypeId
    ).toBe(gameTypeId);
    expect(
      (
        (
          publishInternalEvents as jest.MockedFunction<
            typeof publishInternalEvents
          >
        ).mock.calls[0][0][0] as UserJoinedInternalEventBridgeEvent
      ).roomCode
    ).toBe(roomCode);
    expect(
      (
        (
          publishInternalEvents as jest.MockedFunction<
            typeof publishInternalEvents
          >
        ).mock.calls[0][0][0] as UserJoinedInternalEventBridgeEvent
      ).username
    ).toBe(username);
  });

  test("user is not the host, the room is available, and this is not a new connection, makes the correct calls", async () => {
    // Arrange
    const roomCode = "ABCD";
    const username = "daryl_duck";
    const connectionId = "con1234";
    const isHost = false;
    const gameTypeId = 1;
    const roomStatus = RoomStatus.available;
    const ttl = 3934294309;
    const connection = {} as RoomConnection;
    const room = {
      code: roomCode,
      status: roomStatus,
      gameTypeId,
    } as Room;

    (
      getRoomConnection as jest.MockedFunction<typeof getRoomConnection>
    ).mockResolvedValueOnce(connection);

    // Action
    await processRoomConnection(room, isHost, username, connectionId, ttl);

    // Assert
    expect(establishHostConnection).not.toHaveBeenCalled();
    expect(publishExternalEvents).not.toHaveBeenCalled();
    expect(getRoomConnection).toHaveBeenCalledWith(roomCode, username);
    expect(establishJoinerConnection).toHaveBeenCalledWith(
      room,
      username,
      connectionId
    );
    expect(publishInternalEvents).not.toHaveBeenCalled();
  });

  test("user is not the host, the room is not available, and this is a new connection, makes the correct calls", async () => {
    // Arrange
    const roomCode = "ABCD";
    const username = "daryl_duck";
    const connectionId = "con1234";
    const isHost = false;
    const gameTypeId = 1;
    const roomStatus = RoomStatus.notAvailable;
    const ttl = 3934294309;
    const room = {
      code: roomCode,
      status: roomStatus,
      gameTypeId,
    } as Room;

    (
      getRoomConnection as jest.MockedFunction<typeof getRoomConnection>
    ).mockResolvedValueOnce(undefined);

    // Action
    await processRoomConnection(room, isHost, username, connectionId, ttl);

    // Assert
    expect(establishHostConnection).not.toHaveBeenCalled();
    expect(publishExternalEvents).not.toHaveBeenCalled();
    expect(getRoomConnection).toHaveBeenCalledWith(roomCode, username);
    expect(establishJoinerConnection).toHaveBeenCalledWith(
      room,
      username,
      connectionId
    );
    expect(publishInternalEvents).not.toHaveBeenCalled();
  });

  test("user is not the host, the room is not available, and this is not a new connection, makes the correct calls", async () => {
    // Arrange
    const roomCode = "ABCD";
    const username = "daryl_duck";
    const connectionId = "con1234";
    const isHost = false;
    const gameTypeId = 1;
    const roomStatus = RoomStatus.notAvailable;
    const ttl = 3934294309;
    const connection = {} as RoomConnection;
    const room = {
      code: roomCode,
      status: roomStatus,
      gameTypeId,
    } as Room;

    (
      getRoomConnection as jest.MockedFunction<typeof getRoomConnection>
    ).mockResolvedValueOnce(connection);

    // Action
    await processRoomConnection(room, isHost, username, connectionId, ttl);

    // Assert
    expect(establishHostConnection).not.toHaveBeenCalled();
    expect(publishExternalEvents).not.toHaveBeenCalled();
    expect(getRoomConnection).toHaveBeenCalledWith(roomCode, username);
    expect(establishJoinerConnection).toHaveBeenCalledWith(
      room,
      username,
      connectionId
    );
    expect(publishInternalEvents).not.toHaveBeenCalled();
  });
});

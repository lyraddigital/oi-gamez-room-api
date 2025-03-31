import {
  RoomRemovedInternalEvent,
  HostChangeInternalEvent,
  publishInternalEvents,
} from "@oigamez/event-bridge";
import { Room, RoomConnection } from "@oigamez/models";
import { removeRoomAndHost, updateRoomHost } from "@oigamez/repositories";

import { handleUserLeft } from "../handle-user-left";
import { handleHostDisconnection } from "./handle-host-disconnection.service";

jest.mock("@oigamez/event-bridge", () => {
  return {
    ...jest.requireActual("@oigamez/event-bridge"),
    publishInternalEvents: jest.fn(),
  };
});
jest.mock("@oigamez/repositories");
jest.mock("../handle-user-left");

describe("handleHostDisconnection tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shouldRemoveRoom is true, calls the correct mocks", async () => {
    // Arrange
    const roomCode = "ABCD";
    const username = "daryl_duck";
    const hostConnectionId = "conn123";
    const room = {
      code: roomCode,
    } as Room;
    const roomConnections = [
      {
        username,
        connectionId: hostConnectionId,
      },
    ] as RoomConnection[];
    const shouldRemoveRoom = true;
    const gameTypeId = 1;

    // Action
    await handleHostDisconnection(
      room,
      username,
      roomConnections,
      shouldRemoveRoom,
      gameTypeId
    );

    // Assert
    expect(removeRoomAndHost).toHaveBeenCalledWith(roomCode, username);
    expect(updateRoomHost).not.toHaveBeenCalled();
    expect(handleUserLeft).not.toHaveBeenCalled();
    expect(publishInternalEvents).toHaveBeenCalled();
    expect(
      (
        (
          publishInternalEvents as jest.MockedFunction<
            typeof publishInternalEvents
          >
        ).mock.calls[0][0][0] as RoomRemovedInternalEvent
      ).detailType
    ).toBe("room-internal.room-removed");
    expect(
      (
        (
          publishInternalEvents as jest.MockedFunction<
            typeof publishInternalEvents
          >
        ).mock.calls[0][0][0] as RoomRemovedInternalEvent
      ).gameTypeId
    ).toBe(gameTypeId);
    expect(
      (
        (
          publishInternalEvents as jest.MockedFunction<
            typeof publishInternalEvents
          >
        ).mock.calls[0][0][0] as RoomRemovedInternalEvent
      ).hostConnectionId
    ).toBe(hostConnectionId);
    expect(
      (
        (
          publishInternalEvents as jest.MockedFunction<
            typeof publishInternalEvents
          >
        ).mock.calls[0][0][0] as RoomRemovedInternalEvent
      ).roomCode
    ).toBe(roomCode);
    expect(updateRoomHost).not.toHaveBeenCalled();
  });

  test("shouldRemoveRoom is false, and no other connection exists, calls the correct mocks", async () => {
    // Arrange
    const roomCode = "ABCD";
    const username = "daryl_duck";
    const hostConnectionId = "conn123";
    const room = {
      code: roomCode,
    } as Room;
    const roomConnections = [
      {
        username,
        connectionId: hostConnectionId,
      },
    ] as RoomConnection[];
    const shouldRemoveRoom = false;
    const gameTypeId = 1;

    // Action
    await handleHostDisconnection(
      room,
      username,
      roomConnections,
      shouldRemoveRoom,
      gameTypeId
    );

    // Assert
    expect(removeRoomAndHost).not.toHaveBeenCalled();
    expect(updateRoomHost).not.toHaveBeenCalled();
    expect(handleUserLeft).toHaveBeenCalledWith(
      room,
      username,
      hostConnectionId,
      gameTypeId
    );
    expect(publishInternalEvents).not.toHaveBeenCalled();
  });

  test("shouldRemoveRoom is false, and another connection exists, calls the correct mocks", async () => {
    // Arrange
    const roomCode = "ABCD";
    const username = "daryl_duck";
    const otherUserUsername = "daryl_duck2";
    const hostConnectionId = "conn123";
    const otherUserConnectionId = "conn456";
    const room = {
      code: roomCode,
    } as Room;
    const roomConnections = [
      {
        username,
        connectionId: hostConnectionId,
      },
      {
        username: otherUserUsername,
        connectionId: otherUserConnectionId,
      },
    ] as RoomConnection[];
    const shouldRemoveRoom = false;
    const gameTypeId = 1;

    // Action
    await handleHostDisconnection(
      room,
      username,
      roomConnections,
      shouldRemoveRoom,
      gameTypeId
    );

    // Assert
    expect(removeRoomAndHost).not.toHaveBeenCalled();
    expect(updateRoomHost).toHaveBeenCalledWith(roomCode, otherUserUsername);
    expect(handleUserLeft).toHaveBeenCalledWith(
      room,
      username,
      hostConnectionId,
      gameTypeId
    );
    expect(publishInternalEvents).toHaveBeenCalled();
    expect(
      (
        (
          publishInternalEvents as jest.MockedFunction<
            typeof publishInternalEvents
          >
        ).mock.calls[0][0][0] as HostChangeInternalEvent
      ).detailType
    ).toBe("room-internal.change-host");
    expect(
      (
        (
          publishInternalEvents as jest.MockedFunction<
            typeof publishInternalEvents
          >
        ).mock.calls[0][0][0] as HostChangeInternalEvent
      ).gameTypeId
    ).toBe(gameTypeId);
    expect(
      (
        (
          publishInternalEvents as jest.MockedFunction<
            typeof publishInternalEvents
          >
        ).mock.calls[0][0][0] as HostChangeInternalEvent
      ).oldHostUsername
    ).toBe(username);
    expect(
      (
        (
          publishInternalEvents as jest.MockedFunction<
            typeof publishInternalEvents
          >
        ).mock.calls[0][0][0] as HostChangeInternalEvent
      ).newHostUsername
    ).toBe(otherUserUsername);
    expect(
      (
        (
          publishInternalEvents as jest.MockedFunction<
            typeof publishInternalEvents
          >
        ).mock.calls[0][0][0] as HostChangeInternalEvent
      ).roomCode
    ).toBe(roomCode);
  });
});

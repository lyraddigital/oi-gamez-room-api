import { publishExternalEvents } from "@oigamez/event-bridge";
import { Room } from "/opt/nodejs/oigamez-core";
import { getRoomByCode } from "@oigamez/repositories";

import { UserJoinedExternalEvent } from "../models";
import { publishExternalUserJoinedEvent } from "./external-event.service";

jest.mock("@oigamez/event-bridge", () => {
  return {
    ...jest.requireActual("@oigamez/event-bridge"),
    publishExternalEvents: jest.fn(),
  };
});
jest.mock("@oigamez/repositories");

describe("publishExternalUserJoinedEvent tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("room is not found, publishes the correct event data to event bridge", async () => {
    // Arrange
    const roomCode = "ABCD";
    const username = "daryl_duck";
    const gameTypeId = 1;

    (
      getRoomByCode as jest.MockedFunction<typeof getRoomByCode>
    ).mockResolvedValueOnce(undefined);

    // Action
    await publishExternalUserJoinedEvent(roomCode, username, gameTypeId);

    // Assert
    expect(getRoomByCode).toHaveBeenCalledWith(roomCode);
    expect(publishExternalEvents).toHaveBeenCalled();
    expect(
      (
        (
          publishExternalEvents as jest.MockedFunction<
            typeof publishExternalEvents
          >
        ).mock.calls[0][0][0] as UserJoinedExternalEvent
      ).detailType
    ).toBe("room.user-joined");
    expect(
      (
        (
          publishExternalEvents as jest.MockedFunction<
            typeof publishExternalEvents
          >
        ).mock.calls[0][0][0] as UserJoinedExternalEvent
      ).gameTypeId
    ).toBe(gameTypeId);
    expect(
      (
        (
          publishExternalEvents as jest.MockedFunction<
            typeof publishExternalEvents
          >
        ).mock.calls[0][0][0] as UserJoinedExternalEvent
      ).username
    ).toBe(username);
    expect(
      (
        (
          publishExternalEvents as jest.MockedFunction<
            typeof publishExternalEvents
          >
        ).mock.calls[0][0][0] as UserJoinedExternalEvent
      ).isBelowMinimumUsers
    ).toBe(false);
    expect(
      (
        (
          publishExternalEvents as jest.MockedFunction<
            typeof publishExternalEvents
          >
        ).mock.calls[0][0][0] as UserJoinedExternalEvent
      ).roomCode
    ).toBe(roomCode);
  });

  test("room is found but current users is equal to minimum users, publishes the correct event data to event bridge", async () => {
    // Arrange
    const roomCode = "ABCD";
    const username = "daryl_duck";
    const gameTypeId = 1;
    const room = {
      curNumOfUsers: 2,
      minNumOfUsers: 2,
    } as Room;

    (
      getRoomByCode as jest.MockedFunction<typeof getRoomByCode>
    ).mockResolvedValueOnce(room);

    // Action
    await publishExternalUserJoinedEvent(roomCode, username, gameTypeId);

    // Assert
    expect(getRoomByCode).toHaveBeenCalledWith(roomCode);
    expect(publishExternalEvents).toHaveBeenCalled();
    expect(
      (
        (
          publishExternalEvents as jest.MockedFunction<
            typeof publishExternalEvents
          >
        ).mock.calls[0][0][0] as UserJoinedExternalEvent
      ).detailType
    ).toBe("room.user-joined");
    expect(
      (
        (
          publishExternalEvents as jest.MockedFunction<
            typeof publishExternalEvents
          >
        ).mock.calls[0][0][0] as UserJoinedExternalEvent
      ).gameTypeId
    ).toBe(gameTypeId);
    expect(
      (
        (
          publishExternalEvents as jest.MockedFunction<
            typeof publishExternalEvents
          >
        ).mock.calls[0][0][0] as UserJoinedExternalEvent
      ).username
    ).toBe(username);
    expect(
      (
        (
          publishExternalEvents as jest.MockedFunction<
            typeof publishExternalEvents
          >
        ).mock.calls[0][0][0] as UserJoinedExternalEvent
      ).isBelowMinimumUsers
    ).toBe(false);
    expect(
      (
        (
          publishExternalEvents as jest.MockedFunction<
            typeof publishExternalEvents
          >
        ).mock.calls[0][0][0] as UserJoinedExternalEvent
      ).roomCode
    ).toBe(roomCode);
  });

  test("room is found but current users is more than minimum users, publishes the correct event data to event bridge", async () => {
    // Arrange
    const roomCode = "ABCD";
    const username = "daryl_duck";
    const gameTypeId = 1;
    const room = {
      curNumOfUsers: 3,
      minNumOfUsers: 2,
    } as Room;

    (
      getRoomByCode as jest.MockedFunction<typeof getRoomByCode>
    ).mockResolvedValueOnce(room);

    // Action
    await publishExternalUserJoinedEvent(roomCode, username, gameTypeId);

    // Assert
    expect(getRoomByCode).toHaveBeenCalledWith(roomCode);
    expect(publishExternalEvents).toHaveBeenCalled();
    expect(
      (
        (
          publishExternalEvents as jest.MockedFunction<
            typeof publishExternalEvents
          >
        ).mock.calls[0][0][0] as UserJoinedExternalEvent
      ).detailType
    ).toBe("room.user-joined");
    expect(
      (
        (
          publishExternalEvents as jest.MockedFunction<
            typeof publishExternalEvents
          >
        ).mock.calls[0][0][0] as UserJoinedExternalEvent
      ).gameTypeId
    ).toBe(gameTypeId);
    expect(
      (
        (
          publishExternalEvents as jest.MockedFunction<
            typeof publishExternalEvents
          >
        ).mock.calls[0][0][0] as UserJoinedExternalEvent
      ).username
    ).toBe(username);
    expect(
      (
        (
          publishExternalEvents as jest.MockedFunction<
            typeof publishExternalEvents
          >
        ).mock.calls[0][0][0] as UserJoinedExternalEvent
      ).isBelowMinimumUsers
    ).toBe(false);
    expect(
      (
        (
          publishExternalEvents as jest.MockedFunction<
            typeof publishExternalEvents
          >
        ).mock.calls[0][0][0] as UserJoinedExternalEvent
      ).roomCode
    ).toBe(roomCode);
  });

  test("room is found but current users is less than minimum users, publishes the correct event data to event bridge", async () => {
    // Arrange
    const roomCode = "ABCD";
    const username = "daryl_duck";
    const gameTypeId = 1;
    const room = {
      curNumOfUsers: 1,
      minNumOfUsers: 2,
    } as Room;

    (
      getRoomByCode as jest.MockedFunction<typeof getRoomByCode>
    ).mockResolvedValueOnce(room);

    // Action
    await publishExternalUserJoinedEvent(roomCode, username, gameTypeId);

    // Assert
    expect(getRoomByCode).toHaveBeenCalledWith(roomCode);
    expect(publishExternalEvents).toHaveBeenCalled();
    expect(
      (
        (
          publishExternalEvents as jest.MockedFunction<
            typeof publishExternalEvents
          >
        ).mock.calls[0][0][0] as UserJoinedExternalEvent
      ).detailType
    ).toBe("room.user-joined");
    expect(
      (
        (
          publishExternalEvents as jest.MockedFunction<
            typeof publishExternalEvents
          >
        ).mock.calls[0][0][0] as UserJoinedExternalEvent
      ).gameTypeId
    ).toBe(gameTypeId);
    expect(
      (
        (
          publishExternalEvents as jest.MockedFunction<
            typeof publishExternalEvents
          >
        ).mock.calls[0][0][0] as UserJoinedExternalEvent
      ).username
    ).toBe(username);
    expect(
      (
        (
          publishExternalEvents as jest.MockedFunction<
            typeof publishExternalEvents
          >
        ).mock.calls[0][0][0] as UserJoinedExternalEvent
      ).isBelowMinimumUsers
    ).toBe(true);
    expect(
      (
        (
          publishExternalEvents as jest.MockedFunction<
            typeof publishExternalEvents
          >
        ).mock.calls[0][0][0] as UserJoinedExternalEvent
      ).roomCode
    ).toBe(roomCode);
  });
});

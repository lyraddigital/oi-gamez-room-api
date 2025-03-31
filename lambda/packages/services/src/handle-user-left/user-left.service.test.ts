import {
  publishInternalEvents,
  UserLeftInternalEvent,
} from "@oigamez/event-bridge";
import { removeUserFromRoom } from "@oigamez/repositories";
import { Room } from "@oigamez/models";

import { handleUserLeft } from "./user-left.service";

jest.mock("@oigamez/repositories");
jest.mock("@oigamez/event-bridge", () => {
  return {
    ...jest.requireActual("@oigamez/event-bridge"),
    publishInternalEvents: jest.fn(),
  };
});

describe("handleUserLeft tests", () => {
  test("Calls the correct mock methods", async () => {
    // Arrange
    const roomCode = "ABCD";
    const username = "daryl_duck";
    const connectionId = "conn123";
    const gameTypeId = 1;
    const room = {
      code: roomCode,
    } as Room;

    // Action
    await handleUserLeft(room, username, connectionId, gameTypeId);

    // Assert
    expect(removeUserFromRoom).toHaveBeenCalledWith(room, username);
    expect(
      (
        (
          publishInternalEvents as jest.MockedFunction<
            typeof publishInternalEvents
          >
        ).mock.calls[0][0][0] as UserLeftInternalEvent
      ).roomCode
    ).toBe(roomCode);
    expect(
      (
        (
          publishInternalEvents as jest.MockedFunction<
            typeof publishInternalEvents
          >
        ).mock.calls[0][0][0] as UserLeftInternalEvent
      ).username
    ).toBe(username);
    expect(
      (
        (
          publishInternalEvents as jest.MockedFunction<
            typeof publishInternalEvents
          >
        ).mock.calls[0][0][0] as UserLeftInternalEvent
      ).connectionId
    ).toBe(connectionId);
    expect(
      (
        (
          publishInternalEvents as jest.MockedFunction<
            typeof publishInternalEvents
          >
        ).mock.calls[0][0][0] as UserLeftInternalEvent
      ).gameTypeId
    ).toBe(gameTypeId);
    expect(
      (
        (
          publishInternalEvents as jest.MockedFunction<
            typeof publishInternalEvents
          >
        ).mock.calls[0][0][0] as UserLeftInternalEvent
      ).detailType
    ).toBe("room-internal.user-left");
  });
});

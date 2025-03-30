import { publishExternalEvents } from "@oigamez/event-bridge";

import { UserLeftExternalEvent } from "../models";
import { publishExternalUserLeftEvent } from "./external-event.service";

jest.mock("@oigamez/event-bridge", () => {
  return {
    ...jest.requireActual("@oigamez/event-bridge"),
    publishExternalEvents: jest.fn(),
  };
});

describe("publishExternalHostChangedEvent tests", () => {
  test("publish the correct events to event bridge", async () => {
    // Arrange
    const roomCode = "ABCD";
    const username = "daryl_duck";
    const isBelowMinimumUsers = true;
    const gameTypeId = 1;

    // Action
    await publishExternalUserLeftEvent(
      roomCode,
      username,
      isBelowMinimumUsers,
      gameTypeId
    );

    // Assert
    expect(publishExternalEvents).toHaveBeenCalled();
    expect(
      (
        (
          publishExternalEvents as jest.MockedFunction<
            typeof publishExternalEvents
          >
        ).mock.calls[0][0][0] as UserLeftExternalEvent
      ).detailType
    ).toBe("room.user-left");
    expect(
      (
        (
          publishExternalEvents as jest.MockedFunction<
            typeof publishExternalEvents
          >
        ).mock.calls[0][0][0] as UserLeftExternalEvent
      ).gameTypeId
    ).toBe(gameTypeId);
    expect(
      (
        (
          publishExternalEvents as jest.MockedFunction<
            typeof publishExternalEvents
          >
        ).mock.calls[0][0][0] as UserLeftExternalEvent
      ).username
    ).toBe(username);
    expect(
      (
        (
          publishExternalEvents as jest.MockedFunction<
            typeof publishExternalEvents
          >
        ).mock.calls[0][0][0] as UserLeftExternalEvent
      ).isBelowMinimumUsers
    ).toBe(isBelowMinimumUsers);
    expect(
      (
        (
          publishExternalEvents as jest.MockedFunction<
            typeof publishExternalEvents
          >
        ).mock.calls[0][0][0] as UserLeftExternalEvent
      ).roomCode
    ).toBe(roomCode);
  });
});

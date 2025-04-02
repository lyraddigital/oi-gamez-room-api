import { publishExternalEvents } from "/opt/nodejs/oigamez-communication";

import { UserLeftExternalEventBridgeEvent } from "../models";
import { publishExternalUserLeftEvent } from "./external-event.service";

jest.mock("/opt/nodejs/oigamez-communication", () => {
  return {
    ...jest.requireActual("/opt/nodejs/oigamez-communication"),
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
        ).mock.calls[0][0][0] as UserLeftExternalEventBridgeEvent
      ).detailType
    ).toBe("room.user-left");
    expect(
      (
        (
          publishExternalEvents as jest.MockedFunction<
            typeof publishExternalEvents
          >
        ).mock.calls[0][0][0] as UserLeftExternalEventBridgeEvent
      ).gameTypeId
    ).toBe(gameTypeId);
    expect(
      (
        (
          publishExternalEvents as jest.MockedFunction<
            typeof publishExternalEvents
          >
        ).mock.calls[0][0][0] as UserLeftExternalEventBridgeEvent
      ).username
    ).toBe(username);
    expect(
      (
        (
          publishExternalEvents as jest.MockedFunction<
            typeof publishExternalEvents
          >
        ).mock.calls[0][0][0] as UserLeftExternalEventBridgeEvent
      ).isBelowMinimumUsers
    ).toBe(isBelowMinimumUsers);
    expect(
      (
        (
          publishExternalEvents as jest.MockedFunction<
            typeof publishExternalEvents
          >
        ).mock.calls[0][0][0] as UserLeftExternalEventBridgeEvent
      ).roomCode
    ).toBe(roomCode);
  });
});

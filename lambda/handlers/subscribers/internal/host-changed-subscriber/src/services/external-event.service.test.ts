import { publishExternalEvents } from "@oigamez/event-bridge";

import { HostChangeExternalEvent } from "../models";
import { publishExternalHostChangedEvent } from "./external-event.service";

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
    const oldHostUsername = "daryl_duck";
    const newHostUsername = "daryl_duck2";
    const gameTypeId = 1;

    // Action
    await publishExternalHostChangedEvent(
      roomCode,
      oldHostUsername,
      newHostUsername,
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
        ).mock.calls[0][0][0] as HostChangeExternalEvent
      ).detailType
    ).toBe("room.host-changed");
    expect(
      (
        (
          publishExternalEvents as jest.MockedFunction<
            typeof publishExternalEvents
          >
        ).mock.calls[0][0][0] as HostChangeExternalEvent
      ).gameTypeId
    ).toBe(gameTypeId);
    expect(
      (
        (
          publishExternalEvents as jest.MockedFunction<
            typeof publishExternalEvents
          >
        ).mock.calls[0][0][0] as HostChangeExternalEvent
      ).newHostUsername
    ).toBe(newHostUsername);
    expect(
      (
        (
          publishExternalEvents as jest.MockedFunction<
            typeof publishExternalEvents
          >
        ).mock.calls[0][0][0] as HostChangeExternalEvent
      ).oldHostUsername
    ).toBe(oldHostUsername);
    expect(
      (
        (
          publishExternalEvents as jest.MockedFunction<
            typeof publishExternalEvents
          >
        ).mock.calls[0][0][0] as HostChangeExternalEvent
      ).roomCode
    ).toBe(roomCode);
  });
});

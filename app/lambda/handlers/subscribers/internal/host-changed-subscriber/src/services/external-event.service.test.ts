import { publishExternalEvents } from "@oigamez/communication";

import { HostChangeExternalEventBridgeEvent } from "../models";
import { publishExternalHostChangedEvent } from "./external-event.service";

jest.mock("@oigamez/communication", () => {
  return {
    ...jest.requireActual("@oigamez/communication"),
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
        ).mock.calls[0][0][0] as HostChangeExternalEventBridgeEvent
      ).detailType
    ).toBe("room.host-changed");
    expect(
      (
        (
          publishExternalEvents as jest.MockedFunction<
            typeof publishExternalEvents
          >
        ).mock.calls[0][0][0] as HostChangeExternalEventBridgeEvent
      ).gameTypeId
    ).toBe(gameTypeId);
    expect(
      (
        (
          publishExternalEvents as jest.MockedFunction<
            typeof publishExternalEvents
          >
        ).mock.calls[0][0][0] as HostChangeExternalEventBridgeEvent
      ).newHostUsername
    ).toBe(newHostUsername);
    expect(
      (
        (
          publishExternalEvents as jest.MockedFunction<
            typeof publishExternalEvents
          >
        ).mock.calls[0][0][0] as HostChangeExternalEventBridgeEvent
      ).oldHostUsername
    ).toBe(oldHostUsername);
    expect(
      (
        (
          publishExternalEvents as jest.MockedFunction<
            typeof publishExternalEvents
          >
        ).mock.calls[0][0][0] as HostChangeExternalEventBridgeEvent
      ).roomCode
    ).toBe(roomCode);
  });
});

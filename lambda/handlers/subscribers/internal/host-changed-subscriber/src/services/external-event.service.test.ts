import { publishExternalEvents } from "/opt/nodejs/oigamez-communication.js";

import { HostChangeExternalEventBridgeEvent } from "../models/index.js";
import { publishExternalHostChangedEvent } from "./external-event.service.js";

jest.mock("/opt/nodejs/oigamez-communication.js", () => {
  return {
    ...jest.requireActual("/opt/nodejs/oigamez-communication.js"),
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

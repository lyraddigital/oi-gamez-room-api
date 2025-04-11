import { publishExternalEvents } from "/opt/nodejs/oigamez-communication.js";

import { RoomRemovedExternalEventBridgeEvent } from "../models/index.js";
import { publishExternalRoomRemovedEvent } from "./external-event.service.js";

jest.mock("/opt/nodejs/oigamez-communication.js", () => {
  return {
    ...jest.requireActual("/opt/nodejs/oigamez-communication.js"),
    publishExternalEvents: jest.fn(),
  };
});

describe("publishExternalHostChangedEvent tests", () => {
  test("publish the correct event to event bridge", async () => {
    // Arrange
    const roomCode = "ABCD";
    const gameTypeId = 1;

    // Action
    await publishExternalRoomRemovedEvent(roomCode, gameTypeId);

    // Assert
    expect(publishExternalEvents).toHaveBeenCalled();
    expect(
      (
        (
          publishExternalEvents as jest.MockedFunction<
            typeof publishExternalEvents
          >
        ).mock.calls[0][0][0] as RoomRemovedExternalEventBridgeEvent
      ).detailType
    ).toBe("room.room-removed");
    expect(
      (
        (
          publishExternalEvents as jest.MockedFunction<
            typeof publishExternalEvents
          >
        ).mock.calls[0][0][0] as RoomRemovedExternalEventBridgeEvent
      ).gameTypeId
    ).toBe(gameTypeId);
    expect(
      (
        (
          publishExternalEvents as jest.MockedFunction<
            typeof publishExternalEvents
          >
        ).mock.calls[0][0][0] as RoomRemovedExternalEventBridgeEvent
      ).roomCode
    ).toBe(roomCode);
  });
});

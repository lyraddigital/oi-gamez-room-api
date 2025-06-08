import { publishExternalEvents } from "@oigamez/communication";

import { RoomRemovedExternalEventBridgeEvent } from "../models";
import { publishExternalRoomRemovedEvent } from "./external-event.service";

jest.mock("@oigamez/communication", () => {
  return {
    ...jest.requireActual("@oigamez/communication"),
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

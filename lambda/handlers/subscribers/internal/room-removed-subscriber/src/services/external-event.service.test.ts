import { publishExternalEvents } from "@oigamez/event-bridge";

import { publishExternalRoomRemovedEvent } from "./external-event.service";
import { RoomRemovedExternalEvent } from "../models";

jest.mock("@oigamez/event-bridge", () => {
  return {
    ...jest.requireActual("@oigamez/event-bridge"),
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
        ).mock.calls[0][0][0] as RoomRemovedExternalEvent
      ).detailType
    ).toBe("room.room-removed");
    expect(
      (
        (
          publishExternalEvents as jest.MockedFunction<
            typeof publishExternalEvents
          >
        ).mock.calls[0][0][0] as RoomRemovedExternalEvent
      ).gameTypeId
    ).toBe(gameTypeId);
    expect(
      (
        (
          publishExternalEvents as jest.MockedFunction<
            typeof publishExternalEvents
          >
        ).mock.calls[0][0][0] as RoomRemovedExternalEvent
      ).roomCode
    ).toBe(roomCode);
  });
});

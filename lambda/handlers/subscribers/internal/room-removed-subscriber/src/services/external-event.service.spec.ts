import {
  HostChangeExternalEvent,
  publishExternalEvents,
} from "@oigamez/event-bridge";

import { publishExternalRoomRemovedEvent } from "./external-event.service";

jest.mock("@oigamez/event-bridge", () => {
  return {
    ...jest.requireActual("@oigamez/event-bridge"),
    publishExternalEvents: jest.fn(),
  };
});

describe("publishExternalHostChangedEvent tests", () => {
  it("publish the correct event to event bridge", async () => {
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
        ).mock.calls[0][0][0] as HostChangeExternalEvent
      ).detailType
    ).toBe("room.room-removed");
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
      ).roomCode
    ).toBe(roomCode);
  });
});

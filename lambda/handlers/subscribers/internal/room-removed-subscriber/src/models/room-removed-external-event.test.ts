import { RoomRemovedExternalEvent } from "./room-removed-external-event";

describe("RoomRemovedExternalEvent tests", () => {
  test("all props are set correctly", () => {
    // Arrange
    const roomCode = "ABCD";
    const gameTypeId = 1;

    // Action
    const event = new RoomRemovedExternalEvent(roomCode, gameTypeId);

    // Assert
    expect(event).toBeDefined();
    expect(event.roomCode).toBe(roomCode);
    expect(event.gameTypeId).toBe(gameTypeId);
    expect(event.detailType).toBe("room.room-removed");
  });
});

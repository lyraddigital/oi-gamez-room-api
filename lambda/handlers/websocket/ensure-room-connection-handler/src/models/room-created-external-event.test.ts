import { RoomCreatedExternalEvent } from "./room-created-external-event";

describe("RoomCreatedExternalEvent tests", () => {
  test("all props are set correctly", () => {
    // Arrange
    const roomCode = "ABCD";
    const hostUsername = "some_host";
    const gameTypeId = 1;

    // Action
    const event = new RoomCreatedExternalEvent(
      roomCode,
      hostUsername,
      gameTypeId
    );

    // Assert
    expect(event).toBeDefined();
    expect(event.roomCode).toBe(roomCode);
    expect(event.hostUsername).toBe(hostUsername);
    expect(event.gameTypeId).toBe(gameTypeId);
    expect(event.detailType).toBe("room.room-created");
  });
});

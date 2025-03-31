import { GameStartedEvent } from "./game-started-event";

describe("GameStartedEvent tests", () => {
  test("all props are set correctly", () => {
    // Arrange
    const roomCode = "ABCD";

    // Action
    const event = new GameStartedEvent(roomCode);

    // Assert
    expect(event).toBeDefined();
    expect(event.roomCode).toBe(roomCode);
    expect(event.detailType).toBe("room-receive.game-started");
  });
});

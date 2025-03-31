import { GameCompletedEvent } from "./game-completed-event";

describe("GameCompletedEvent tests", () => {
  test("all props are set correctly", () => {
    // Arrange
    const roomCode = "ABCD";

    // Action
    const event = new GameCompletedEvent(roomCode);

    // Assert
    expect(event).toBeDefined();
    expect(event.roomCode).toBe(roomCode);
    expect(event.detailType).toBe("room-receive.game-completed");
  });
});

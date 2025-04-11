import { GameCompletedEventReceivedEvent } from "./game-completed-event-received-event.js";

describe("GameCompletedEventReceivedEvent tests", () => {
  test("all props are set correctly", () => {
    // Arrange
    const roomCode = "ABCD";

    // Action
    const event = new GameCompletedEventReceivedEvent(roomCode);

    // Assert
    expect(event).toBeDefined();
    expect(event.roomCode).toBe(roomCode);
    expect(event.detailType).toBe("room-receive.game-completed");
  });
});

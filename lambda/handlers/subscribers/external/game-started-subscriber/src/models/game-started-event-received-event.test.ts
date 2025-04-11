import { GameStartedEventReceivedEvent } from "./game-started-event-received-event.js";

describe("GameStartedEventReceivedEvent tests", () => {
  test("all props are set correctly", () => {
    // Arrange
    const roomCode = "ABCD";

    // Action
    const event = new GameStartedEventReceivedEvent(roomCode);

    // Assert
    expect(event).toBeDefined();
    expect(event.roomCode).toBe(roomCode);
    expect(event.detailType).toBe("room-receive.game-started");
  });
});

import { EventBridgeReceivedEventType } from "./types";
import { GameStartedEvent } from "./game-started-event";

describe("GameStartedEvent tests", () => {
  it("all props are set correctly", () => {
    // Arrange
    const roomCode = "ABCD";

    // Action
    const event = new GameStartedEvent(roomCode);

    // Assert
    expect(event).toBeDefined();
    expect(event.roomCode).toBe(roomCode);
    expect(event.detailType).toBe(EventBridgeReceivedEventType.gameStarted);
  });
});

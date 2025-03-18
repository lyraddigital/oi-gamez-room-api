import { EventBridgeReceivedEventType } from "./types";
import { GameInitializedEvent } from "./game-initialized-event";

describe("GameInitializedEvent tests", () => {
  test("all props are set correctly", () => {
    // Arrange
    const roomCode = "ABCD";

    // Action
    const event = new GameInitializedEvent(roomCode);

    // Assert
    expect(event).toBeDefined();
    expect(event.roomCode).toBe(roomCode);
    expect(event.detailType).toBe(EventBridgeReceivedEventType.gameInitialized);
  });
});

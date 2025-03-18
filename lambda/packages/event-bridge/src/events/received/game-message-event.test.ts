import { EventBridgeReceivedEventType } from "./types";
import { GameMessageEvent } from "./game-message-event";

describe("GameMessageEvent tests", () => {
  test("all props are set correctly", () => {
    // Arrange
    const roomCode = "ABCD";
    const customAction = "someAction";
    const payload = { name: "something" };

    // Action
    const event = new GameMessageEvent(roomCode, customAction, payload);

    // Assert
    expect(event).toBeDefined();
    expect(event.roomCode).toBe(roomCode);
    expect(event.detailType).toBe(EventBridgeReceivedEventType.gameMessage);
  });
});

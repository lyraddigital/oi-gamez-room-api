import { GameMessageEventReceivedEvent } from "./game-message-event-received-event.js";

describe("GameMessageEventReceivedEvent tests", () => {
  test("all props are set correctly", () => {
    // Arrange
    const roomCode = "ABCD";
    const customAction = "someAction";
    const payload = { name: "something" };

    // Action
    const event = new GameMessageEventReceivedEvent(
      roomCode,
      customAction,
      payload
    );

    // Assert
    expect(event).toBeDefined();
    expect(event.roomCode).toBe(roomCode);
    expect(event.detailType).toBe("room-receive.game-message");
  });
});

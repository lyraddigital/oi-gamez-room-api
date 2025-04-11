import { GameInitializedEventReceivedEvent } from "./game-initialized-event-received-event.js";

describe("GameInitializedEventReceivedEvent tests", () => {
  test("all props are set correctly", () => {
    // Arrange
    const roomCode = "ABCD";

    // Action
    const event = new GameInitializedEventReceivedEvent(roomCode);

    // Assert
    expect(event).toBeDefined();
    expect(event.roomCode).toBe(roomCode);
    expect(event.detailType).toBe("room-receive.game-initialized");
  });
});

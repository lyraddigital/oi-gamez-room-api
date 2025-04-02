import { GameCompletedWebsocketEvent } from "./game-completed-websocket-event";

describe("GameCompletedWebsocketEvent tests", () => {
  test("correct properties is set", () => {
    // Arrange / Action
    const event = new GameCompletedWebsocketEvent();

    // Assert
    expect(event.action).toBe("gameCompleted");
  });
});

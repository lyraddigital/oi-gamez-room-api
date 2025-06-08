import { GameStartedWebsocketEvent } from "./game-started-websocket-event";

describe("GameStartedWebsocketEvent tests", () => {
  test("correct properties is set", () => {
    // Arrange / Action
    const event = new GameStartedWebsocketEvent();

    // Assert
    expect(event.action).toBe("gameStarted");
  });
});

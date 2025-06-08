import { GameInitializedWebsocketEvent } from "./game-initialized-websocket-event";

describe("GameInitializedWebsocketEvent tests", () => {
  test("correct properties is set", () => {
    // Arrange / Action
    const event = new GameInitializedWebsocketEvent();

    // Assert
    expect(event.action).toBe("gameInitialized");
  });
});

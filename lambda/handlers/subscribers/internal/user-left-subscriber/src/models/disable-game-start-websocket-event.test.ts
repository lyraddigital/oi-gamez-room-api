import { DisableGameStartWebsocketEvent } from "./disable-game-start-websocket-event.js";

describe("DisableGameStartWebsocketEvent tests", () => {
  test("correct properties is set", () => {
    // Arrange / Action
    const event = new DisableGameStartWebsocketEvent();

    // Assert
    expect(event.action).toBe("disableGameStart");
  });
});

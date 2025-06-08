import { GameMessageWebsocketEvent } from "./game-message-websocket-event";

describe("GameMessageWebsocketEvent tests", () => {
  test("correct properties is set", () => {
    // Arrange / Action
    const action = "someAction";
    const payload = { name: "daryl" };
    const event = new GameMessageWebsocketEvent(action, payload);

    // Assert
    expect(event.action).toBe(action);
    expect(event.payload).toEqual(payload);
  });
});

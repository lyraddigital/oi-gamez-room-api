import { GameMessageCommunicationEvent } from "./game-message-communication-event";

describe("GameMessageCommunicationEvent tests", () => {
  test("correct properties is set", () => {
    // Arrange / Action
    const action = "someAction";
    const payload = { name: "daryl" };
    const event = new GameMessageCommunicationEvent(action, payload);

    // Assert
    expect(event.action).toBe(action);
    expect(event.payload).toEqual(payload);
  });
});

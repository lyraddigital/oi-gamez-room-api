import { DisableGameStartCommunicationEvent } from "./disable-game-start-communication-event";

describe("DisableGameStartCommunicationEvent tests", () => {
  test("correct properties is set", () => {
    // Arrange / Action
    const event = new DisableGameStartCommunicationEvent();

    // Assert
    expect(event.action).toBe("disableGameStart");
  });
});

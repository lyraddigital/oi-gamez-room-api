import { CommunicationActionTypes } from "./communication-action-types";
import { GameStartedCommunicationEvent } from "./game-started-communication-event";

describe("GameStartedCommunicationEvent tests", () => {
  test("correct properties is set", () => {
    // Arrange / Action
    const event = new GameStartedCommunicationEvent();

    // Assert
    expect(event.action).toBe(CommunicationActionTypes.gameStarted);
  });
});

import { CommunicationActionTypes } from "./communication-action-types";

describe("CommunicationActionTypes tests", () => {
  test("correct string set for each enum value", () => {
    // Arrange / Action / Assert
    expect(CommunicationActionTypes.userJoined).toBe("userJoined");
    expect(CommunicationActionTypes.userLeft).toBe("userLeft");
    expect(CommunicationActionTypes.roomRemoved).toBe("roomRemoved");
    expect(CommunicationActionTypes.changeHost).toBe("changeHost");
    expect(CommunicationActionTypes.gameInitialized).toBe("gameInitialized");
    expect(CommunicationActionTypes.gameStarted).toBe("gameStarted");
    expect(CommunicationActionTypes.gameCompleted).toBe("gameCompleted");
    expect(CommunicationActionTypes.disableGameStart).toBe("disableGameStart");
    expect(CommunicationActionTypes.enableGameStart).toBe("enableGameStart");
    expect(CommunicationActionTypes.hostTransfer).toBe("hostTransfer");
  });
});

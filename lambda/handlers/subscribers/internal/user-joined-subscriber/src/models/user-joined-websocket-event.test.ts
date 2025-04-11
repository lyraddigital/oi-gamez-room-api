import { UserJoinedWebsocketEvent } from "./user-joined-websocket-event.js";

describe("UserJoinedWebsocketEvent tests", () => {
  test("correct properties is set", () => {
    // Arrange / Action
    const username = "daryl_duck";
    const event = new UserJoinedWebsocketEvent(username);

    // Assert
    expect(event.action).toBe("userJoined");
    expect(event.username).toBe(username);
  });
});

import { UserLeftWebsocketEvent } from "./user-left-websocket-event.js";

describe("UserLeftWebsocketEvent tests", () => {
  test("correct properties is set", () => {
    // Arrange / Action
    const username = "daryl_duck";
    const event = new UserLeftWebsocketEvent(username);

    // Assert
    expect(event.action).toBe("userLeft");
    expect(event.username).toBe(username);
  });
});

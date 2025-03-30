import { UserLeftCommunicationEvent } from "./user-left-communication-event";

describe("UserLeftCommunicationEvent tests", () => {
  test("correct properties is set", () => {
    // Arrange / Action
    const username = "daryl_duck";
    const event = new UserLeftCommunicationEvent(username);

    // Assert
    expect(event.action).toBe("userLeft");
    expect(event.username).toBe(username);
  });
});

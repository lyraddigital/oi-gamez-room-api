import { closeConnection } from "@oigamez/communication";

import { communicateRoomRemoved } from "./communication.service";

jest.mock("@oigamez/communication");

describe("communicateRoomRemoved tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("if connection id is not set, does not attempt to close the connection", async () => {
    // Arrange / Action
    await communicateRoomRemoved(undefined);

    // Assert
    expect(closeConnection).not.toHaveBeenCalled();
  });

  test("if connection id is set, attempts to close the connection", async () => {
    // Arrange
    const connectionId = "conn1234";

    // Action
    await communicateRoomRemoved(connectionId);

    // Assert
    expect(closeConnection).toHaveBeenCalledWith(connectionId);
  });
});

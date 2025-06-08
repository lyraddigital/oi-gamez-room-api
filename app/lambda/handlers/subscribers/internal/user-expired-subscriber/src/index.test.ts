import { EventBridgeEvent } from "aws-lambda";

import { Room } from "@oigamez/core";
import { UserConnectionExpiredInternalEventBridgeEvent } from "@oigamez/communication";
import { getRoomByCode } from "@oigamez/data";
import { handleUserLeft } from "@oigamez/services";

import { handler } from ".";

jest.mock("@oigamez/data");
jest.mock("@oigamez/services");
jest.mock("./configuration");
jest.mock("./services");

describe("user expired subscriber handler tests", () => {
  test("makes the correct calls", async () => {
    // Arrange
    const roomCode = "ABCD";
    const username = "daryl_duck";
    const gameTypeId = 1;
    const room = {} as Room;
    const event = {
      detail: {
        roomCode,
        username,
        gameTypeId,
      },
    } as EventBridgeEvent<
      "room-internal.user-connection-expired",
      UserConnectionExpiredInternalEventBridgeEvent
    >;
    (
      getRoomByCode as jest.MockedFunction<typeof getRoomByCode>
    ).mockResolvedValueOnce(room);

    // Action
    await handler(event);

    // Assert
    expect(handleUserLeft).toHaveBeenCalledWith(
      room,
      username,
      undefined,
      gameTypeId
    );
    expect(getRoomByCode).toHaveBeenCalledWith(roomCode);
  });
});

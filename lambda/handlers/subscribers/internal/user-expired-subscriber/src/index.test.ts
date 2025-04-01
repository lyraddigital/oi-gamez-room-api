import { UserConnectionExpiredInternalEvent } from "@oigamez/event-bridge";
import { Room } from "/opt/nodejs/oigamez-core";
import { getRoomByCode } from "@oigamez/repositories";
import { handleUserLeft } from "@oigamez/services";
import { EventBridgeEvent } from "aws-lambda";

import { handler } from ".";

jest.mock("@oigamez/repositories");
jest.mock("@oigamez/services");

jest.mock("./configuration");

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
      UserConnectionExpiredInternalEvent
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

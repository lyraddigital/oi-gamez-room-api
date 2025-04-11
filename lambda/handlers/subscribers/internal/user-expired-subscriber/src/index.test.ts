import { EventBridgeEvent } from "aws-lambda";

import { Room } from "@oigamez/core";
import { UserConnectionExpiredInternalEventBridgeEvent } from "@oigamez/communication";
import { getRoomByCode } from "@oigamez/data";
import { handleUserLeft } from "/opt/nodejs/oigamez-services.js";

import { handler } from "./index.js";

jest.mock("@oigamez/data");
jest.mock("/opt/nodejs/oigamez-services.js");
jest.mock("./configuration/index.js");
jest.mock("./services/index.js");

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

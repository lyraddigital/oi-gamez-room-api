import { EventBridgeEvent } from "aws-lambda";

import { Room, RoomConnection } from "@oigamez/core";
import { HostConnectionExpiredInternalEventBridgeEvent } from "@oigamez/communication";
import { getRoomByCode, getRoomConnections } from "@oigamez/data";
import { handleHostDisconnection } from "@oigamez/services";

import { handler } from ".";

jest.mock("@oigamez/data");
jest.mock("@oigamez/services");
jest.mock("./configuration");
jest.mock("./services");

describe("host expired subscriber handler tests", () => {
  test("makes the correct calls", async () => {
    // Arrange
    const roomCode = "ABCD";
    const username = "daryl_duck";
    const shouldRemoveRoom = true;
    const gameTypeId = 1;
    const room = {} as Room;
    const connections = [] as RoomConnection[];
    const event = {
      detail: {
        roomCode,
        username,
        shouldRemoveRoom,
        gameTypeId,
      },
    } as EventBridgeEvent<
      "room-internal.host-connection-expired",
      HostConnectionExpiredInternalEventBridgeEvent
    >;

    (
      getRoomConnections as jest.MockedFunction<typeof getRoomConnections>
    ).mockResolvedValueOnce(connections);
    (
      getRoomByCode as jest.MockedFunction<typeof getRoomByCode>
    ).mockResolvedValueOnce(room);

    // Action
    await handler(event);

    // Assert
    expect(handleHostDisconnection).toHaveBeenCalledWith(
      room,
      username,
      connections,
      shouldRemoveRoom,
      gameTypeId
    );
    expect(getRoomConnections).toHaveBeenCalledWith(roomCode);
    expect(getRoomByCode).toHaveBeenCalledWith(roomCode);
  });
});

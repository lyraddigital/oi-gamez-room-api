import { RoomConnection } from "@oigamez/core";
import {
  UserConnectionExpiredInternalEventBridgeEvent,
  publishInternalEvents,
} from "@oigamez/communication";

import { publishAllUserExpirations } from "./publish-all-user-expirations.service.js";

jest.mock("@oigamez/communication", () => {
  return {
    ...jest.requireActual("@oigamez/communication"),
    publishInternalEvents: jest.fn(),
  };
});

describe("publishAllUserExpirations tests", () => {
  test("raises a set of user connection expired events", async () => {
    // Arrange
    const connectionOne = {
      roomCode: "ABCD",
      username: "daryl_duck",
    } as RoomConnection;
    const connectionTwo = {
      roomCode: "EFGH",
      username: "daryl_duck2",
    } as RoomConnection;
    const connectionThree = {
      roomCode: "IJKL",
      username: "daryl_duck3",
    } as RoomConnection;
    const connections = [connectionOne, connectionTwo, connectionThree];

    (
      publishInternalEvents as jest.MockedFunction<typeof publishInternalEvents>
    ).mockResolvedValueOnce({} as never);

    // Action
    await publishAllUserExpirations(connections);

    expect(publishInternalEvents).toHaveBeenCalledTimes(1);

    connections.forEach((r, i) => {
      const event = (
        publishInternalEvents as jest.MockedFunction<
          typeof publishInternalEvents
        >
      ).mock.calls[0][0][i] as UserConnectionExpiredInternalEventBridgeEvent;

      expect(event.detailType).toBe("room-internal.user-connection-expired");
      expect(event.roomCode).toBe(r.roomCode);
      expect(event.username).toBe(r.username);
    });
  });
});

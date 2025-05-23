import { Room, RoomConnection } from "@oigamez/core";
import { getRoomByCode, getRoomConnections } from "@oigamez/data";

import { getRoomAndConnections } from "./get-room-and-connections.service.js";

jest.mock("@oigamez/data");

describe("getRoomAndConnections tests", () => {
  test("Correct reponse is generated with correct status code", async () => {
    // Arrange
    const roomCode = "ABCD";
    const username = "daryl_duck";
    const ttl = 101;
    const expectedRoom = {
      code: roomCode,
    } as Room;
    const expectedRoomConnections = [
      {
        roomCode,
        username,
      } as RoomConnection,
    ];

    (
      getRoomByCode as jest.MockedFunction<typeof getRoomByCode>
    ).mockResolvedValueOnce(expectedRoom);
    (
      getRoomConnections as jest.MockedFunction<typeof getRoomConnections>
    ).mockResolvedValueOnce(expectedRoomConnections);

    // Action
    const [room, roomConnections] = await getRoomAndConnections(roomCode, ttl);

    // Assert
    expect(room).toBeDefined();
    expect(room).toEqual(expectedRoom);
    expect(roomConnections).toBeDefined();
    expect(roomConnections).toEqual(expectedRoomConnections);
    expect(getRoomByCode).toHaveBeenCalledWith(roomCode, ttl);
    expect(getRoomConnections).toHaveBeenCalledWith(roomCode, ttl);
  });
});

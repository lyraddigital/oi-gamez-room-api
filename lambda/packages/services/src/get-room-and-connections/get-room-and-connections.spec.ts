import { getRoomByCode, getRoomConnections } from "@oigamez/repositories";
import { Room, RoomConnection } from "@oigamez/models";

import { getRoomAndConnections } from "./get-room-and-connections";

jest.mock("@oigamez/repositories");

describe("getRoomAndConnections tests", () => {
  it("Correct reponse is generated with correct status code", async () => {
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

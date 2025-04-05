import { getRoomByCode } from "/opt/nodejs/oigamez-data";

import { getRoomStatus } from "./get-room-status.service";
import { Room, RoomStatus } from "/opt/nodejs/oigamez-core";

jest.mock("/opt/nodejs/oigamez-data");

describe("getRoomStatus tests", () => {
  test("room is not found, returns a not found status", async () => {
    // Arrange
    const roomCode = "ABCD";
    const ttl = 398484;

    // Action
    const roomStatus = await getRoomStatus(roomCode, ttl);

    // Assert
    expect(roomStatus).toBeDefined();
    expect(roomStatus.canJoin).toBe(false);
    expect(roomStatus.reason).toBe("Not Found");
  });

  test("room is found but is full, returns a room is full status", async () => {
    // Arrange
    const roomCode = "ABCD";
    const ttl = 398484;
    const room = {
      curNumOfUsers: 3,
      maxNumOfUsers: 3,
      status: RoomStatus.available,
    } as Room;

    (
      getRoomByCode as jest.MockedFunction<typeof getRoomByCode>
    ).mockResolvedValueOnce(room);

    // Action
    const roomStatus = await getRoomStatus(roomCode, ttl);

    // Assert
    expect(roomStatus).toBeDefined();
    expect(roomStatus.canJoin).toBe(false);
    expect(roomStatus.reason).toBe("Room is full");
    expect(getRoomByCode).toHaveBeenCalledWith(roomCode, ttl);
  });

  test("room is found and is not in an available status, returns the correct room status", async () => {
    // Arrange
    const roomCode = "ABCD";
    const ttl = 398484;
    const room = {
      curNumOfUsers: 2,
      maxNumOfUsers: 3,
      status: RoomStatus.inProgress,
    } as Room;

    (
      getRoomByCode as jest.MockedFunction<typeof getRoomByCode>
    ).mockResolvedValueOnce(room);

    // Action
    const roomStatus = await getRoomStatus(roomCode, ttl);

    // Assert
    expect(roomStatus).toBeDefined();
    expect(roomStatus.canJoin).toBe(false);
    expect(roomStatus.reason).toBe("in progress");
  });

  test("room is found and is in an available status, returns the correct room status", async () => {
    // Arrange
    const roomCode = "ABCD";
    const ttl = 398484;
    const room = {
      curNumOfUsers: 2,
      maxNumOfUsers: 3,
      status: RoomStatus.available,
    } as Room;

    (
      getRoomByCode as jest.MockedFunction<typeof getRoomByCode>
    ).mockResolvedValueOnce(room);

    // Action
    const roomStatus = await getRoomStatus(roomCode, ttl);

    // Assert
    expect(roomStatus).toBeDefined();
    expect(roomStatus.canJoin).toBe(true);
    expect(roomStatus.reason).toBe("");
  });
});

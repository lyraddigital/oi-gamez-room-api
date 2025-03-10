import { getRoomByCode } from "@oigamez/repositories";

import { getRoomStatus } from "./get-room-status.service";
import { Room, RoomStatus } from "@oigamez/models";

jest.mock("@oigamez/repositories");

describe("getRoomStatus tests", () => {
  it("room is not found, returns a not found status", async () => {
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

  it("room is found but is full, returns a room is full status", async () => {
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
  });

  it("room is found and is not in an available status, returns the correct room status", async () => {
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

  it("room is found and is in an available status, returns the correct room status", async () => {
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

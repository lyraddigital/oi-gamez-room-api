import { Room, RoomConnection, RoomStatus } from "/opt/nodejs/oigamez-core";

import { runLeaveRoomRuleSet } from "./leave-room.ruleSet";

describe("runLeaveRoomRuleSet tests", () => {
  test("room is not set, returns correct error", () => {
    // Arrange
    const username = "daryl_duck";
    const connections: RoomConnection[] = [];

    // Action
    const result = runLeaveRoomRuleSet(username, undefined, connections);

    // Assert
    expect(result).toBeDefined();
    expect(result.isSuccessful).toBe(false);
    expect(result.errorMessages).toHaveLength(1);
    expect(result.errorMessages[0]).toBe(
      "Cannot leave room. The room could not be found."
    );
  });

  test("room status is not available, returns correct error", () => {
    // Arrange
    const username = "daryl_duck";
    const room = {
      status: RoomStatus.notAvailable,
    } as Room;
    const connections: RoomConnection[] = [];

    // Action
    const result = runLeaveRoomRuleSet(username, room, connections);

    // Assert
    expect(result).toBeDefined();
    expect(result.isSuccessful).toBe(false);
    expect(result.errorMessages).toHaveLength(1);
    expect(result.errorMessages[0]).toBe(
      "Cannot leave room. The room has to be available."
    );
  });

  test("room status is in progress, returns correct error", () => {
    // Arrange
    const username = "daryl_duck";
    const room = {
      status: RoomStatus.inProgress,
    } as Room;
    const connections: RoomConnection[] = [];

    // Action
    const result = runLeaveRoomRuleSet(username, room, connections);

    // Assert
    expect(result).toBeDefined();
    expect(result.isSuccessful).toBe(false);
    expect(result.errorMessages).toHaveLength(1);
    expect(result.errorMessages[0]).toBe(
      "Cannot leave room. The room has to be available."
    );
  });

  test("room status is completed, returns correct error", () => {
    // Arrange
    const username = "daryl_duck";
    const room = {
      status: RoomStatus.completed,
    } as Room;
    const connections: RoomConnection[] = [];

    // Action
    const result = runLeaveRoomRuleSet(username, room, connections);

    // Assert
    expect(result).toBeDefined();
    expect(result.isSuccessful).toBe(false);
    expect(result.errorMessages).toHaveLength(1);
    expect(result.errorMessages[0]).toBe(
      "Cannot leave room. The room has to be available."
    );
  });

  test("user is not in the room, returns correct error", () => {
    // Arrange
    const username = "daryl_duck";
    const room = {
      status: RoomStatus.available,
      curNumOfUsers: 3,
      maxNumOfUsers: 4,
    } as Room;
    const connections: RoomConnection[] = [];

    // Action
    const result = runLeaveRoomRuleSet(username, room, connections);

    // Assert
    expect(result).toBeDefined();
    expect(result.isSuccessful).toBe(false);
    expect(result.errorMessages).toHaveLength(1);
    expect(result.errorMessages[0]).toBe(
      "Cannot leave room. The user is not in the room"
    );
  });

  test("all rules pass, returns success", () => {
    // Arrange
    const username = "daryl_duck";
    const room = {
      status: RoomStatus.available,
      curNumOfUsers: 3,
      maxNumOfUsers: 4,
    } as Room;
    const connections: RoomConnection[] = [
      {
        username,
        connectionId: "conn1234",
        roomCode: "ABCD",
      },
    ];

    // Action
    const result = runLeaveRoomRuleSet(username, room, connections);

    // Assert
    expect(result).toBeDefined();
    expect(result.isSuccessful).toBe(true);
    expect(result.errorMessages).toHaveLength(0);
  });
});

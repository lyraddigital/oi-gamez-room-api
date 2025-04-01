import { Room, RoomConnection, RoomStatus } from "/opt/nodejs/oigamez-core";

import { runEnsureRoomConnectionRuleSet } from "./ensure-room-connection.ruleSet";

describe("runEnsureRoomConnectionRuleSet tests", () => {
  test("room not set, returns unsuccessful", () => {
    // Arrange
    const isUserHost = true;
    const username = "daryl_duck";
    const connections = [] as RoomConnection[];

    // Action
    const result = runEnsureRoomConnectionRuleSet(
      isUserHost,
      undefined,
      username,
      connections
    );

    // Assert
    expect(result.isSuccessful).toBe(false);
    expect(result.errorMessages).toHaveLength(1);
    expect(result.errorMessages[0]).toBe(
      "Could not connect to room. Could not find it. Check your room code."
    );
  });

  test("room is set and user is host, returns successful", () => {
    // Arrange
    const isUserHost = true;
    const username = "daryl_duck";
    const room = {} as Room;
    const connections = [] as RoomConnection[];

    // Action
    const result = runEnsureRoomConnectionRuleSet(
      isUserHost,
      room,
      username,
      connections
    );

    // Assert
    expect(result.isSuccessful).toBe(true);
    expect(result.errorMessages).toHaveLength(0);
  });

  test("room is set, but not available and user is not host, returns unsuccessful", () => {
    // Arrange
    const isUserHost = false;
    const username = "daryl_duck";
    const room = {
      status: RoomStatus.notAvailable,
    } as Room;
    const connections = [] as RoomConnection[];

    // Action
    const result = runEnsureRoomConnectionRuleSet(
      isUserHost,
      room,
      username,
      connections
    );

    // Assert
    expect(result.isSuccessful).toBe(false);
    expect(result.errorMessages).toHaveLength(1);
    expect(result.errorMessages[0]).toBe(
      "Could not connect to room. Could not find it. Check your room code."
    );
  });

  test("room is set and available and user is not host but room is full, returns unsuccessful", () => {
    // Arrange
    const isUserHost = false;
    const username = "daryl_duck";
    const room = {
      status: RoomStatus.available,
      curNumOfUsers: 4,
      maxNumOfUsers: 4,
    } as Room;
    const connections = [] as RoomConnection[];

    // Action
    const result = runEnsureRoomConnectionRuleSet(
      isUserHost,
      room,
      username,
      connections
    );

    // Assert
    expect(result.isSuccessful).toBe(false);
    expect(result.errorMessages).toHaveLength(1);
    expect(result.errorMessages[0]).toBe(
      "Could not connect to room. The room is full."
    );
  });

  test("room is set and available and user is not host but already connected to the room, returns unsuccessful", () => {
    // Arrange
    const isUserHost = false;
    const username = "daryl_duck";
    const room = {
      status: RoomStatus.available,
      curNumOfUsers: 3,
      maxNumOfUsers: 4,
    } as Room;
    const connections = [
      {
        username,
      },
    ] as RoomConnection[];

    // Action
    const result = runEnsureRoomConnectionRuleSet(
      isUserHost,
      room,
      username,
      connections
    );

    // Assert
    expect(result.isSuccessful).toBe(false);
    expect(result.errorMessages).toHaveLength(1);
    expect(result.errorMessages[0]).toBe(
      "Could not connect to room. The user is already in the room."
    );
  });

  test("user cannot connect to a room they are not in if the room is no longer available", () => {
    // Arrange
    const isUserHost = false;
    const username = "daryl_duck";
    const room = {
      status: RoomStatus.inProgress,
      curNumOfUsers: 3,
      maxNumOfUsers: 4,
    } as Room;
    const connections = [] as RoomConnection[];

    // Action
    const result = runEnsureRoomConnectionRuleSet(
      isUserHost,
      room,
      username,
      connections
    );

    // Assert
    expect(result.isSuccessful).toBe(false);
    expect(result.errorMessages).toHaveLength(1);
    expect(result.errorMessages[0]).toBe(
      "Could not connect to room. The room is currently not available."
    );
  });

  test("user can connect to a room they are in when the room is in an in progress status", () => {
    // Arrange
    const isUserHost = false;
    const username = "daryl_duck";
    const room = {
      status: RoomStatus.inProgress,
      curNumOfUsers: 3,
      maxNumOfUsers: 4,
    } as Room;
    const connections = [
      {
        username,
      },
    ] as RoomConnection[];

    // Action
    const result = runEnsureRoomConnectionRuleSet(
      isUserHost,
      room,
      username,
      connections
    );

    // Assert
    expect(result.isSuccessful).toBe(true);
    expect(result.errorMessages).toHaveLength(0);
  });

  test("user can connect to a room they are in when the room is in a completed status", () => {
    // Arrange
    const isUserHost = false;
    const username = "daryl_duck";
    const room = {
      status: RoomStatus.completed,
      curNumOfUsers: 3,
      maxNumOfUsers: 4,
    } as Room;
    const connections = [
      {
        username,
      },
    ] as RoomConnection[];

    // Action
    const result = runEnsureRoomConnectionRuleSet(
      isUserHost,
      room,
      username,
      connections
    );

    // Assert
    expect(result.isSuccessful).toBe(true);
    expect(result.errorMessages).toHaveLength(0);
  });
});

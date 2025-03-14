import {
  verifyCorsAllowedOrigin,
  verifyDynamoConnectionTableName,
  verifyDynamoTableName,
} from "@oigamez/configuration";

import { runJoinRoomRuleSet } from "./join-room.ruleSet";
import { Room, RoomConnection, RoomStatus } from "@oigamez/models";

jest.mock("@oigamez/configuration");

describe("runJoinRoomRuleSet tests", () => {
  it("room is not set, returns correct error", () => {
    // Arrange
    const username = "daryl_duck";
    const connections: RoomConnection[] = [];

    // Action
    const result = runJoinRoomRuleSet(username, undefined, connections);

    // Assert
    expect(result).toBeDefined();
    expect(result.isSuccessful).toBe(false);
    expect(result.errorMessages).toHaveLength(1);
    expect(result.errorMessages[0]).toBe(
      "Cannot join room. The room could not be found."
    );
  });

  it("room status is not available, returns correct error", () => {
    // Arrange
    const username = "daryl_duck";
    const room = {
      status: RoomStatus.notAvailable,
    } as Room;
    const connections: RoomConnection[] = [];

    // Action
    const result = runJoinRoomRuleSet(username, room, connections);

    // Assert
    expect(result).toBeDefined();
    expect(result.isSuccessful).toBe(false);
    expect(result.errorMessages).toHaveLength(1);
    expect(result.errorMessages[0]).toBe(
      "Cannot join room. The room is not available."
    );
  });

  it("room status is in progress, returns correct error", () => {
    // Arrange
    const username = "daryl_duck";
    const room = {
      status: RoomStatus.inProgress,
    } as Room;
    const connections: RoomConnection[] = [];

    // Action
    const result = runJoinRoomRuleSet(username, room, connections);

    // Assert
    expect(result).toBeDefined();
    expect(result.isSuccessful).toBe(false);
    expect(result.errorMessages).toHaveLength(1);
    expect(result.errorMessages[0]).toBe(
      "Cannot join room. The room is not available."
    );
  });

  it("room status is completed, returns correct error", () => {
    // Arrange
    const username = "daryl_duck";
    const room = {
      status: RoomStatus.completed,
    } as Room;
    const connections: RoomConnection[] = [];

    // Action
    const result = runJoinRoomRuleSet(username, room, connections);

    // Assert
    expect(result).toBeDefined();
    expect(result.isSuccessful).toBe(false);
    expect(result.errorMessages).toHaveLength(1);
    expect(result.errorMessages[0]).toBe(
      "Cannot join room. The room is not available."
    );
  });

  it("room status is available but full, returns correct error", () => {
    // Arrange
    const username = "daryl_duck";
    const room = {
      status: RoomStatus.available,
      curNumOfUsers: 4,
      maxNumOfUsers: 4,
    } as Room;
    const connections: RoomConnection[] = [];

    // Action
    const result = runJoinRoomRuleSet(username, room, connections);

    // Assert
    expect(result).toBeDefined();
    expect(result.isSuccessful).toBe(false);
    expect(result.errorMessages).toHaveLength(1);
    expect(result.errorMessages[0]).toBe("Cannot join room. The room is full.");
  });

  it("user is already in the room, returns correct error", () => {
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
    const result = runJoinRoomRuleSet(username, room, connections);

    // Assert
    expect(result).toBeDefined();
    expect(result.isSuccessful).toBe(false);
    expect(result.errorMessages).toHaveLength(1);
    expect(result.errorMessages[0]).toBe(
      "Cannot join room. The user is already in the room"
    );
  });

  it("all rules pass, returns successful", () => {
    // Arrange
    const username = "daryl_duck";
    const room = {
      status: RoomStatus.available,
      curNumOfUsers: 3,
      maxNumOfUsers: 4,
    } as Room;
    const connections: RoomConnection[] = [];

    // Action
    const result = runJoinRoomRuleSet(username, room, connections);

    // Assert
    expect(result).toBeDefined();
    expect(result.isSuccessful).toBe(true);
    expect(result.errorMessages).toHaveLength(0);
  });
});

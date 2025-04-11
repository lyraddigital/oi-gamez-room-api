import { Room, RoomConnection } from "@oigamez/core";
import {
  handleHostDisconnection,
  handleUserLeft,
} from "/opt/nodejs/oigamez-services.js";

import { LeaveRoomPayload } from "../models/index.js";
import { processLeavingRoom } from "./processor.service.js";

jest.mock("/opt/nodejs/oigamez-services.js");

describe("leave room processor tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("room user is the host and current number of users is 1, should handle the host disconnection", async () => {
    // Arrange
    const username = "daryl_duck";
    const hostUsername = "daryl_duck";
    const gameTypeId = 1;
    const room = {
      hostUsername,
      curNumOfUsers: 1,
      gameTypeId,
    } as Room;
    const connections = [] as RoomConnection[];
    const payload = {
      username,
    } as LeaveRoomPayload;

    // Action
    await processLeavingRoom(room, connections, payload);

    // Assert
    expect(handleHostDisconnection).toHaveBeenCalledWith(
      room,
      username,
      connections,
      true,
      gameTypeId
    );
    expect(handleUserLeft).not.toHaveBeenCalled();
  });

  test("room user is the host and current number of users is 2, should handle the host disconnection", async () => {
    // Arrange
    const username = "daryl_duck";
    const hostUsername = "daryl_duck";
    const gameTypeId = 1;
    const room = {
      hostUsername,
      curNumOfUsers: 2,
      gameTypeId,
    } as Room;
    const connections = [] as RoomConnection[];
    const payload = {
      username,
    } as LeaveRoomPayload;

    // Action
    await processLeavingRoom(room, connections, payload);

    // Assert
    expect(handleHostDisconnection).toHaveBeenCalledWith(
      room,
      username,
      connections,
      false,
      gameTypeId
    );
    expect(handleUserLeft).not.toHaveBeenCalled();
  });

  test("room user is not the host and they do not have an active connection, should handle the user leaving", async () => {
    // Arrange
    const username = "daryl_duck2";
    const hostUsername = "daryl_duck";
    const gameTypeId = 1;
    const room = {
      hostUsername,
      curNumOfUsers: 2,
      gameTypeId,
    } as Room;
    const connections = [] as RoomConnection[];
    const payload = {
      username,
    } as LeaveRoomPayload;

    // Action
    await processLeavingRoom(room, connections, payload);

    // Assert
    expect(handleHostDisconnection).not.toHaveBeenCalled();
    expect(handleUserLeft).toHaveBeenCalledWith(
      room,
      username,
      undefined,
      gameTypeId
    );
  });

  test("room user is not the host and they do have an active connection, should handle the user leaving", async () => {
    // Arrange
    const username = "daryl_duck2";
    const hostUsername = "daryl_duck";
    const gameTypeId = 1;
    const connectionId = "conn1234";
    const room = {
      hostUsername,
      curNumOfUsers: 2,
      gameTypeId,
    } as Room;
    const connections = [
      {
        username,
        connectionId,
      },
    ] as RoomConnection[];
    const payload = {
      username,
    } as LeaveRoomPayload;

    // Action
    await processLeavingRoom(room, connections, payload);

    // Assert
    expect(handleHostDisconnection).not.toHaveBeenCalled();
    expect(handleUserLeft).toHaveBeenCalledWith(
      room,
      username,
      connectionId,
      gameTypeId
    );
  });
});

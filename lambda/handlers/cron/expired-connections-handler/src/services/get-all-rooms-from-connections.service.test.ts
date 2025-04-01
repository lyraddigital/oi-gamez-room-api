import { Room, RoomConnection } from "/opt/nodejs/oigamez-core";

import { getAvailableRoomsByCodes } from "../repositories";
import { getAllHostedRoomsFromConnections } from "./get-all-rooms-from-connections.service";

jest.mock("../repositories");

describe("getAllHostedRoomsFromConnections", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("all connections are non host connections, returns no rooms", async () => {
    // Arrange
    const usernameOne = "daryl_duck";
    const usernameTwo = "daryl_duck2";
    const usernameThree = "daryl_duck3";
    const usernameFour = "daryl_duck4";
    const usernameFive = "daryl_duck5";
    const usernameSix = "daryl_duck6";
    const roomCodeOne = "ABCD";
    const roomCodeTwo = "EFGH";
    const roomCodeThree = "IJKL";
    const connections = [
      {
        username: usernameOne,
        roomCode: roomCodeOne,
      },
      {
        username: usernameTwo,
        roomCode: roomCodeOne,
      },
      {
        username: usernameThree,
        roomCode: roomCodeTwo,
      },
      {
        username: usernameFour,
        roomCode: roomCodeThree,
      },
    ] as RoomConnection[];
    const rooms = [
      {
        hostUsername: usernameFive,
      },
      {
        hostUsername: usernameSix,
      },
    ] as Room[];

    (
      getAvailableRoomsByCodes as jest.MockedFunction<
        typeof getAvailableRoomsByCodes
      >
    ).mockResolvedValueOnce(rooms);

    // Action
    const hostedRooms = await getAllHostedRoomsFromConnections(connections);

    // Assert
    expect(hostedRooms).toHaveLength(0);
    expect(getAvailableRoomsByCodes).toHaveBeenCalledWith([
      roomCodeOne,
      roomCodeTwo,
      roomCodeThree,
    ]);
  });

  test("all connections are non host connections, returns no rooms", async () => {
    // Arrange
    const usernameOne = "daryl_duck";
    const usernameTwo = "daryl_duck2";
    const usernameThree = "daryl_duck3";
    const usernameFour = "daryl_duck4";
    const roomCodeOne = "ABCD";
    const roomCodeTwo = "EFGH";
    const roomCodeThree = "IJKL";
    const connections = [
      {
        username: usernameOne,
        roomCode: roomCodeOne,
      },
      {
        username: usernameTwo,
        roomCode: roomCodeOne,
      },
      {
        username: usernameThree,
        roomCode: roomCodeTwo,
      },
      {
        username: usernameFour,
        roomCode: roomCodeThree,
      },
    ] as RoomConnection[];
    const rooms = [
      {
        hostUsername: usernameOne,
      },
      {
        hostUsername: usernameThree,
      },
    ] as Room[];

    (
      getAvailableRoomsByCodes as jest.MockedFunction<
        typeof getAvailableRoomsByCodes
      >
    ).mockResolvedValueOnce(rooms);

    // Action
    const hostedRooms = await getAllHostedRoomsFromConnections(connections);

    // Assert
    expect(hostedRooms).toHaveLength(2);
    expect(getAvailableRoomsByCodes).toHaveBeenCalledWith([
      roomCodeOne,
      roomCodeTwo,
      roomCodeThree,
    ]);
  });
});

import { Room, RoomConnection } from "@oigamez/models";
import { convertFromMillisecondsToSeconds } from "@oigamez/services";
import { EventBridgeEvent } from "aws-lambda";

import { getAllExpiredConnections } from "./repositories";
import {
  getAllHostedRoomsFromConnections,
  publishAllHostExpirations,
  publishAllUserExpirations,
} from "./services";
import { handler } from ".";

jest.mock("@oigamez/services");
jest.mock("./configuration");
jest.mock("./repositories");
jest.mock("./services");

describe("expired connections handler tests", () => {
  test("no connections have expired, makes the correct calls", async () => {
    // Arrange
    const connections = [] as RoomConnection[];
    const hostedRooms = [] as Room[];
    const currentTimeInSeconds = 3933938;
    const event = {} as EventBridgeEvent<
      "room-internal.expired-connections",
      void
    >;

    (
      convertFromMillisecondsToSeconds as jest.MockedFunction<
        typeof convertFromMillisecondsToSeconds
      >
    ).mockReturnValueOnce(currentTimeInSeconds);
    (
      getAllExpiredConnections as jest.MockedFunction<
        typeof getAllExpiredConnections
      >
    ).mockResolvedValueOnce(connections);
    (
      getAllHostedRoomsFromConnections as jest.MockedFunction<
        typeof getAllHostedRoomsFromConnections
      >
    ).mockResolvedValueOnce(hostedRooms);

    // Action
    await handler(event);

    // Assert
    expect(publishAllHostExpirations).not.toHaveBeenCalled();
    expect(publishAllUserExpirations).not.toHaveBeenCalled();
    expect(convertFromMillisecondsToSeconds).toHaveBeenCalled();
    expect(getAllExpiredConnections).toHaveBeenCalledWith(currentTimeInSeconds);
    expect(getAllHostedRoomsFromConnections).toHaveBeenCalledWith(connections);
  });

  test("2 connections are from hosts and 2 are from joiners, makes the correct calls", async () => {
    // Arrange
    const roomOneCode = "ABCD";
    const roomTwoCode = "EFGH";
    const roomThreeCode = "IJKL";
    const roomFourCode = "MNOP";
    const userOneUsername = "daryl_duck";
    const userTwoUsername = "daryl_duck2";
    const userThreeUsername = "daryl_duck3";
    const userFourUsername = "daryl_duck4";
    const roomOne = {
      code: roomOneCode,
      hostUsername: userOneUsername,
      curNumOfUsers: 1,
    } as Room;
    const roomTwo = {
      code: roomTwoCode,
      hostUsername: userTwoUsername,
      curNumOfUsers: 1,
    } as Room;
    const connectionOne = {
      roomCode: roomOneCode,
      username: userOneUsername,
    } as RoomConnection;
    const connectionTwo = {
      roomCode: roomTwoCode,
      username: userTwoUsername,
    } as RoomConnection;
    const connectionThree = {
      roomCode: roomThreeCode,
      username: userThreeUsername,
    } as RoomConnection;
    const connectionFour = {
      roomCode: roomFourCode,
      username: userFourUsername,
    } as RoomConnection;
    const connections = [
      connectionOne,
      connectionTwo,
      connectionThree,
      connectionFour,
    ] as RoomConnection[];
    const hostedRooms = [roomOne, roomTwo] as Room[];
    const currentTimeInSeconds = 3933938;
    const event = {} as EventBridgeEvent<
      "room-internal.expired-connections",
      void
    >;

    (
      convertFromMillisecondsToSeconds as jest.MockedFunction<
        typeof convertFromMillisecondsToSeconds
      >
    ).mockReturnValueOnce(currentTimeInSeconds);
    (
      getAllExpiredConnections as jest.MockedFunction<
        typeof getAllExpiredConnections
      >
    ).mockResolvedValueOnce(connections);
    (
      getAllHostedRoomsFromConnections as jest.MockedFunction<
        typeof getAllHostedRoomsFromConnections
      >
    ).mockResolvedValueOnce(hostedRooms);

    // Action
    await handler(event);

    // Assert
    expect(publishAllHostExpirations).toHaveBeenCalledWith([
      { code: roomOneCode, curNumOfUsers: 0, hostUsername: userOneUsername },
      { code: roomTwoCode, curNumOfUsers: 0, hostUsername: userTwoUsername },
    ]);
    expect(publishAllUserExpirations).toHaveBeenCalledWith([
      { roomCode: roomThreeCode, username: userThreeUsername },
      { roomCode: roomFourCode, username: userFourUsername },
    ]);
    expect(convertFromMillisecondsToSeconds).toHaveBeenCalled();
    expect(getAllExpiredConnections).toHaveBeenCalledWith(currentTimeInSeconds);
    expect(getAllHostedRoomsFromConnections).toHaveBeenCalledWith(connections);
  });
});

import { getRoomConnections } from "@oigamez/repositories";
import { getConnectionIdsFromConnections } from "@oigamez/services";

import { Room, RoomConnection } from "/opt/nodejs/oigamez-core";
import { broadcast, closeConnection } from "/opt/nodejs/oigamez-communication";
import {
  DisableGameStartWebsocketEvent,
  UserLeftWebsocketEvent,
} from "../models";
import { communicateUserLeft } from "./communication.service";

jest.mock("/opt/nodejs/oigamez-communication", () => {
  return {
    ...jest.requireActual("/opt/nodejs/oigamez-communication"),
    broadcast: jest.fn(),
    closeConnection: jest.fn(),
  };
});
jest.mock("@oigamez/repositories");
jest.mock("@oigamez/services");

describe("communicateUserLeft tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("broadcasts a user left event to all other connections only when the connectionId is not set and isBelowMinimumUsers is false", async () => {
    // Arrange
    const roomCode = "ABCD";
    const userOneUsername = "daryl_duck";
    const userTwoUsername = "daryl_duck2";
    const userThreeUsername = "daryl_duck3";
    const connectionOne = "conn1234";
    const connectionTwo = "conn5678";
    const room = {} as Room;
    const connections = [
      {
        username: userOneUsername,
      },
      {
        username: userTwoUsername,
      },
      {
        username: userThreeUsername,
      },
    ] as RoomConnection[];
    const connectionIds = [connectionOne, connectionTwo];

    (
      getRoomConnections as jest.MockedFunction<typeof getRoomConnections>
    ).mockResolvedValueOnce(connections);

    (
      getConnectionIdsFromConnections as jest.MockedFunction<
        typeof getConnectionIdsFromConnections
      >
    ).mockReturnValueOnce(connectionIds);

    // Action
    await communicateUserLeft(
      roomCode,
      userOneUsername,
      room,
      false,
      undefined
    );

    // Assert
    expect(getRoomConnections).toHaveBeenCalledWith(roomCode);
    expect(getConnectionIdsFromConnections).toHaveBeenCalledWith([
      {
        username: userTwoUsername,
      },
      {
        username: userThreeUsername,
      },
    ]);
    expect(broadcast).toHaveBeenCalledTimes(1);
    expect(
      (broadcast as jest.MockedFunction<typeof broadcast>).mock
        .calls[0][0] as string[]
    ).toEqual(connectionIds);
    expect(
      (
        (broadcast as jest.MockedFunction<typeof broadcast>).mock
          .calls[0][1] as UserLeftWebsocketEvent
      ).action
    ).toBe("userLeft");
    expect(
      (
        (broadcast as jest.MockedFunction<typeof broadcast>).mock
          .calls[0][1] as UserLeftWebsocketEvent
      ).username
    ).toBe(userOneUsername);
    expect(closeConnection).not.toHaveBeenCalled();
  });

  test("broadcasts a user left event to all other connections only when the username passed in is the host but is below the minimum number of users and connectionId is not set", async () => {
    // Arrange
    const roomCode = "ABCD";
    const userOneUsername = "daryl_duck";
    const userTwoUsername = "daryl_duck2";
    const userThreeUsername = "daryl_duck3";
    const connectionOne = "conn1234";
    const connectionTwo = "conn5678";
    const room = {
      hostUsername: userOneUsername,
    } as Room;
    const connections = [
      {
        username: userOneUsername,
      },
      {
        username: userTwoUsername,
      },
      {
        username: userThreeUsername,
      },
    ] as RoomConnection[];
    const connectionIds = [connectionOne, connectionTwo];

    (
      getRoomConnections as jest.MockedFunction<typeof getRoomConnections>
    ).mockResolvedValueOnce(connections);

    (
      getConnectionIdsFromConnections as jest.MockedFunction<
        typeof getConnectionIdsFromConnections
      >
    ).mockReturnValueOnce(connectionIds);

    // Action
    await communicateUserLeft(roomCode, userOneUsername, room, true, undefined);

    // Assert
    expect(getRoomConnections).toHaveBeenCalledWith(roomCode);
    expect(getConnectionIdsFromConnections).toHaveBeenCalledWith([
      {
        username: userTwoUsername,
      },
      {
        username: userThreeUsername,
      },
    ]);
    expect(broadcast).toHaveBeenCalledTimes(1);
    expect(
      (broadcast as jest.MockedFunction<typeof broadcast>).mock
        .calls[0][0] as string[]
    ).toEqual(connectionIds);
    expect(
      (
        (broadcast as jest.MockedFunction<typeof broadcast>).mock
          .calls[0][1] as UserLeftWebsocketEvent
      ).action
    ).toBe("userLeft");
    expect(
      (
        (broadcast as jest.MockedFunction<typeof broadcast>).mock
          .calls[0][1] as UserLeftWebsocketEvent
      ).username
    ).toBe(userOneUsername);
    expect(closeConnection).not.toHaveBeenCalled();
  });

  test("broadcasts both a user left event to all other connections as well as a disabled game start event to the host when the username passed in is not the host but is below the minimum number of users and connectionId is not set", async () => {
    // Arrange
    const roomCode = "ABCD";
    const userOneUsername = "daryl_duck";
    const userTwoUsername = "daryl_duck2";
    const userThreeUsername = "daryl_duck3";
    const room = {
      hostUsername: userOneUsername,
    } as Room;
    const connectionOne = "conn1234";
    const connectionTwo = "conn5678";
    const connectionThree = "conn9101";
    const connections = [
      {
        username: userOneUsername,
      },
      {
        username: userTwoUsername,
      },
      {
        username: userThreeUsername,
      },
    ] as RoomConnection[];
    const otherConnectionIds = [connectionTwo, connectionThree];
    const hostConnectionIds = [connectionOne];

    (
      getRoomConnections as jest.MockedFunction<typeof getRoomConnections>
    ).mockResolvedValueOnce(connections);

    (
      getConnectionIdsFromConnections as jest.MockedFunction<
        typeof getConnectionIdsFromConnections
      >
    )
      .mockReturnValueOnce(otherConnectionIds)
      .mockReturnValueOnce(hostConnectionIds);

    // Action
    await communicateUserLeft(roomCode, userTwoUsername, room, true, undefined);

    // Assert
    expect(getRoomConnections).toHaveBeenCalledWith(roomCode);
    expect(getConnectionIdsFromConnections).toHaveBeenCalledTimes(2);
    expect(getConnectionIdsFromConnections).toHaveBeenNthCalledWith(1, [
      {
        username: userOneUsername,
      },
      {
        username: userThreeUsername,
      },
    ]);
    expect(getConnectionIdsFromConnections).toHaveBeenNthCalledWith(2, [
      {
        username: userOneUsername,
      },
    ]);
    expect(broadcast).toHaveBeenCalledTimes(2);
    expect(
      (broadcast as jest.MockedFunction<typeof broadcast>).mock
        .calls[0][0] as string[]
    ).toEqual(otherConnectionIds);
    expect(
      (
        (broadcast as jest.MockedFunction<typeof broadcast>).mock
          .calls[0][1] as UserLeftWebsocketEvent
      ).action
    ).toBe("userLeft");
    expect(
      (
        (broadcast as jest.MockedFunction<typeof broadcast>).mock
          .calls[0][1] as UserLeftWebsocketEvent
      ).username
    ).toBe(userTwoUsername);
    expect(
      (broadcast as jest.MockedFunction<typeof broadcast>).mock
        .calls[1][0] as string[]
    ).toEqual(hostConnectionIds);
    expect(
      (
        (broadcast as jest.MockedFunction<typeof broadcast>).mock
          .calls[1][1] as DisableGameStartWebsocketEvent
      ).action
    ).toBe("disableGameStart");
    expect(closeConnection).not.toHaveBeenCalled();
  });

  test("broadcasts both events and also closes the current connection as connectionId is now set", async () => {
    // Arrange
    const roomCode = "ABCD";
    const userOneUsername = "daryl_duck";
    const userTwoUsername = "daryl_duck2";
    const userThreeUsername = "daryl_duck3";
    const connectionId = "conn1234";
    const room = {
      hostUsername: userOneUsername,
    } as Room;
    const connectionOne = "conn1234";
    const connectionTwo = "conn5678";
    const connectionThree = "conn9101";
    const connections = [
      {
        username: userOneUsername,
      },
      {
        username: userTwoUsername,
      },
      {
        username: userThreeUsername,
      },
    ] as RoomConnection[];
    const otherConnectionIds = [connectionTwo, connectionThree];
    const hostConnectionIds = [connectionOne];

    (
      getRoomConnections as jest.MockedFunction<typeof getRoomConnections>
    ).mockResolvedValueOnce(connections);

    (
      getConnectionIdsFromConnections as jest.MockedFunction<
        typeof getConnectionIdsFromConnections
      >
    )
      .mockReturnValueOnce(otherConnectionIds)
      .mockReturnValueOnce(hostConnectionIds);

    // Action
    await communicateUserLeft(
      roomCode,
      userTwoUsername,
      room,
      true,
      connectionId
    );

    // Assert
    expect(getRoomConnections).toHaveBeenCalledWith(roomCode);
    expect(getConnectionIdsFromConnections).toHaveBeenCalledTimes(2);
    expect(getConnectionIdsFromConnections).toHaveBeenNthCalledWith(1, [
      {
        username: userOneUsername,
      },
      {
        username: userThreeUsername,
      },
    ]);
    expect(broadcast).toHaveBeenCalledTimes(2);
    expect(
      (broadcast as jest.MockedFunction<typeof broadcast>).mock
        .calls[0][0] as string[]
    ).toEqual(otherConnectionIds);
    expect(
      (
        (broadcast as jest.MockedFunction<typeof broadcast>).mock
          .calls[0][1] as UserLeftWebsocketEvent
      ).action
    ).toBe("userLeft");
    expect(
      (
        (broadcast as jest.MockedFunction<typeof broadcast>).mock
          .calls[0][1] as UserLeftWebsocketEvent
      ).username
    ).toBe(userTwoUsername);
    expect(
      (broadcast as jest.MockedFunction<typeof broadcast>).mock
        .calls[1][0] as string[]
    ).toEqual(hostConnectionIds);
    expect(
      (
        (broadcast as jest.MockedFunction<typeof broadcast>).mock
          .calls[1][1] as DisableGameStartWebsocketEvent
      ).action
    ).toBe("disableGameStart");
    expect(closeConnection).toHaveBeenCalledWith(connectionId);
  });
});

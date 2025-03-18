import {
  broadcast,
  closeConnection,
  DisableGameStartCommunicationEvent,
  UserLeftCommunicationEvent,
} from "@oigamez/communication";
import { Room, RoomConnection } from "@oigamez/models";
import { getRoomConnections } from "@oigamez/repositories";

import { communicateUserLeft } from "./communication.service";

jest.mock("@oigamez/communication", () => {
  return {
    ...jest.requireActual("@oigamez/communication"),
    broadcast: jest.fn(),
    closeConnection: jest.fn(),
  };
});
jest.mock("@oigamez/repositories");

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

    (
      getRoomConnections as jest.MockedFunction<typeof getRoomConnections>
    ).mockResolvedValueOnce(connections);

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
    expect(broadcast).toHaveBeenCalledTimes(1);
    expect(
      (broadcast as jest.MockedFunction<typeof broadcast>).mock
        .calls[0][0] as RoomConnection[]
    ).toEqual([{ username: userTwoUsername }, { username: userThreeUsername }]);
    expect(
      (
        (broadcast as jest.MockedFunction<typeof broadcast>).mock
          .calls[0][1] as UserLeftCommunicationEvent
      ).action
    ).toBe("userLeft");
    expect(
      (
        (broadcast as jest.MockedFunction<typeof broadcast>).mock
          .calls[0][1] as UserLeftCommunicationEvent
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

    (
      getRoomConnections as jest.MockedFunction<typeof getRoomConnections>
    ).mockResolvedValueOnce(connections);

    // Action
    await communicateUserLeft(roomCode, userOneUsername, room, true, undefined);

    // Assert
    expect(getRoomConnections).toHaveBeenCalledWith(roomCode);
    expect(broadcast).toHaveBeenCalledTimes(1);
    expect(
      (broadcast as jest.MockedFunction<typeof broadcast>).mock
        .calls[0][0] as RoomConnection[]
    ).toEqual([{ username: userTwoUsername }, { username: userThreeUsername }]);
    expect(
      (
        (broadcast as jest.MockedFunction<typeof broadcast>).mock
          .calls[0][1] as UserLeftCommunicationEvent
      ).action
    ).toBe("userLeft");
    expect(
      (
        (broadcast as jest.MockedFunction<typeof broadcast>).mock
          .calls[0][1] as UserLeftCommunicationEvent
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

    (
      getRoomConnections as jest.MockedFunction<typeof getRoomConnections>
    ).mockResolvedValueOnce(connections);

    // Action
    await communicateUserLeft(roomCode, userTwoUsername, room, true, undefined);

    // Assert
    expect(getRoomConnections).toHaveBeenCalledWith(roomCode);
    expect(broadcast).toHaveBeenCalledTimes(2);
    expect(
      (broadcast as jest.MockedFunction<typeof broadcast>).mock
        .calls[0][0] as RoomConnection[]
    ).toEqual([{ username: userOneUsername }, { username: userThreeUsername }]);
    expect(
      (
        (broadcast as jest.MockedFunction<typeof broadcast>).mock
          .calls[0][1] as UserLeftCommunicationEvent
      ).action
    ).toBe("userLeft");
    expect(
      (
        (broadcast as jest.MockedFunction<typeof broadcast>).mock
          .calls[0][1] as UserLeftCommunicationEvent
      ).username
    ).toBe(userTwoUsername);
    expect(
      (broadcast as jest.MockedFunction<typeof broadcast>).mock
        .calls[1][0] as RoomConnection[]
    ).toEqual([{ username: userOneUsername }]);
    expect(
      (
        (broadcast as jest.MockedFunction<typeof broadcast>).mock
          .calls[1][1] as DisableGameStartCommunicationEvent
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

    (
      getRoomConnections as jest.MockedFunction<typeof getRoomConnections>
    ).mockResolvedValueOnce(connections);

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
    expect(broadcast).toHaveBeenCalledTimes(2);
    expect(
      (broadcast as jest.MockedFunction<typeof broadcast>).mock
        .calls[0][0] as RoomConnection[]
    ).toEqual([{ username: userOneUsername }, { username: userThreeUsername }]);
    expect(
      (
        (broadcast as jest.MockedFunction<typeof broadcast>).mock
          .calls[0][1] as UserLeftCommunicationEvent
      ).action
    ).toBe("userLeft");
    expect(
      (
        (broadcast as jest.MockedFunction<typeof broadcast>).mock
          .calls[0][1] as UserLeftCommunicationEvent
      ).username
    ).toBe(userTwoUsername);
    expect(
      (broadcast as jest.MockedFunction<typeof broadcast>).mock
        .calls[1][0] as RoomConnection[]
    ).toEqual([{ username: userOneUsername }]);
    expect(
      (
        (broadcast as jest.MockedFunction<typeof broadcast>).mock
          .calls[1][1] as DisableGameStartCommunicationEvent
      ).action
    ).toBe("disableGameStart");
    expect(closeConnection).toHaveBeenCalledWith(connectionId);
  });
});

import { RoomConnection } from "@oigamez/core";
import { broadcast } from "@oigamez/communication";
import { getRoomConnections } from "@oigamez/data";
import { getConnectionIdsFromConnections } from "@oigamez/services";

import { UserJoinedWebsocketEvent } from "../models";
import { communicateUserJoined } from "./communication.service";

jest.mock("@oigamez/communication", () => {
  return {
    ...jest.requireActual("@oigamez/communication"),
    broadcast: jest.fn(),
  };
});
jest.mock("@oigamez/data");
jest.mock("@oigamez/services");

describe("communicateUserJoined tests", () => {
  test("broadcasts the correct events to the correct connections", async () => {
    // Arrange
    const roomCode = "ABCD";
    const userOneUsername = "daryl_duck";
    const userTwoUsername = "daryl_duck2";
    const userThreeUsername = "daryl_duck3";
    const connectionOne = "conn5678";
    const connectionTwo = "conn9101";
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
    const filteredConnectionIds = [connectionOne, connectionTwo];

    (
      getRoomConnections as jest.MockedFunction<typeof getRoomConnections>
    ).mockResolvedValueOnce(connections);

    (
      getConnectionIdsFromConnections as jest.MockedFunction<
        typeof getConnectionIdsFromConnections
      >
    ).mockReturnValueOnce(filteredConnectionIds);

    // Action
    await communicateUserJoined(roomCode, userOneUsername);

    // Assert
    expect(getRoomConnections).toHaveBeenCalledWith(roomCode);
    expect(
      (broadcast as jest.MockedFunction<typeof broadcast>).mock
        .calls[0][0] as string[]
    ).toEqual(filteredConnectionIds);
    expect(
      (
        (broadcast as jest.MockedFunction<typeof broadcast>).mock
          .calls[0][1] as UserJoinedWebsocketEvent
      ).action
    ).toBe("userJoined");
    expect(
      (
        (broadcast as jest.MockedFunction<typeof broadcast>).mock
          .calls[0][1] as UserJoinedWebsocketEvent
      ).username
    ).toBe(userOneUsername);
  });
});

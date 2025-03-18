import {
  broadcast,
  UserJoinedCommunicationEvent,
} from "@oigamez/communication";
import { RoomConnection } from "@oigamez/models";
import { getRoomConnections } from "@oigamez/repositories";

import { communicateUserJoined } from "./communication.service";

jest.mock("@oigamez/communication", () => {
  return {
    ...jest.requireActual("@oigamez/communication"),
    broadcast: jest.fn(),
  };
});
jest.mock("@oigamez/repositories");

describe("communicateUserJoined tests", () => {
  test("broadcasts the correct events to the correct connections", async () => {
    // Arrange
    const roomCode = "ABCD";
    const userOneUsername = "daryl_duck";
    const userTwoUsername = "daryl_duck2";
    const userThreeUsername = "daryl_duck3";
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
    await communicateUserJoined(roomCode, userOneUsername);

    // Assert
    expect(getRoomConnections).toHaveBeenCalledWith(roomCode);
    expect(
      (broadcast as jest.MockedFunction<typeof broadcast>).mock
        .calls[0][0] as RoomConnection[]
    ).toEqual([{ username: userTwoUsername }, { username: userThreeUsername }]);
    expect(
      (
        (broadcast as jest.MockedFunction<typeof broadcast>).mock
          .calls[0][1] as UserJoinedCommunicationEvent
      ).action
    ).toBe("userJoined");
    expect(
      (
        (broadcast as jest.MockedFunction<typeof broadcast>).mock
          .calls[0][1] as UserJoinedCommunicationEvent
      ).username
    ).toBe(userOneUsername);
  });
});

import {
  broadcast,
  HostChangeCommunicationEvent,
  HostTransferCommunicationEvent,
} from "@oigamez/communication";
import { RoomConnection } from "@oigamez/models";
import { getRoomConnections } from "@oigamez/repositories";

import { communicateHostChanged } from "./communication.service";

jest.mock("@oigamez/communication", () => {
  return {
    ...jest.requireActual("@oigamez/communication"),
    broadcast: jest.fn(),
  };
});
jest.mock("@oigamez/repositories");

describe("communicateHostChanged tests", () => {
  test("broadcasts the correct events to the correct connections", async () => {
    // Arrange
    const roomCode = "ABCD";
    const oldHostUsername = "daryl_duck";
    const newHostUsername = "daryl_duck2";
    const anotherUsername = "daryl_duck3";
    const connections = [
      {
        username: oldHostUsername,
      },
      {
        username: newHostUsername,
      },
      {
        username: anotherUsername,
      },
    ] as RoomConnection[];

    (
      getRoomConnections as jest.MockedFunction<typeof getRoomConnections>
    ).mockResolvedValueOnce(connections);

    // Action
    await communicateHostChanged(roomCode, oldHostUsername, newHostUsername);

    // Assert
    expect(getRoomConnections).toHaveBeenCalledWith(roomCode);
    expect(
      (broadcast as jest.MockedFunction<typeof broadcast>).mock
        .calls[0][0] as RoomConnection[]
    ).toEqual([{ username: oldHostUsername }, { username: anotherUsername }]);
    expect(
      (
        (broadcast as jest.MockedFunction<typeof broadcast>).mock
          .calls[0][1] as HostChangeCommunicationEvent
      ).action
    ).toBe("changeHost");
    expect(
      (
        (broadcast as jest.MockedFunction<typeof broadcast>).mock
          .calls[0][1] as HostChangeCommunicationEvent
      ).newHostName
    ).toBe(newHostUsername);
    expect(
      (
        (broadcast as jest.MockedFunction<typeof broadcast>).mock
          .calls[0][1] as HostChangeCommunicationEvent
      ).oldHostname
    ).toBe(oldHostUsername);
    expect(
      (broadcast as jest.MockedFunction<typeof broadcast>).mock
        .calls[1][0] as RoomConnection[]
    ).toEqual([{ username: newHostUsername }]);
    expect(
      (
        (broadcast as jest.MockedFunction<typeof broadcast>).mock
          .calls[1][1] as HostTransferCommunicationEvent
      ).action
    ).toBe("hostTransfer");
  });
});

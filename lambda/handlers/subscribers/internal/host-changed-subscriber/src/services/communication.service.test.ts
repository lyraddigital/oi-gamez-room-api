import { getConnectionIdsFromConnections } from "@oigamez/services";

import { RoomConnection } from "/opt/nodejs/oigamez-core";
import { broadcast } from "/opt/nodejs/oigamez-communication";
import { getRoomConnections } from "/opt/nodejs/oigamez-data";
import {
  HostChangeWebsocketEvent,
  HostTransferWebsocketEvent,
} from "../models";
import { communicateHostChanged } from "./communication.service";

jest.mock("@oigamez/services");
jest.mock("/opt/nodejs/oigamez-communication", () => {
  return {
    ...jest.requireActual("/opt/nodejs/oigamez-communication"),
    broadcast: jest.fn(),
  };
});
jest.mock("/opt/nodejs/oigamez-data");

describe("communicateHostChanged tests", () => {
  test("broadcasts the correct events to the correct connections", async () => {
    // Arrange
    const roomCode = "ABCD";
    const oldHostUsername = "daryl_duck";
    const newHostUsername = "daryl_duck2";
    const anotherUsername = "daryl_duck3";
    const connectionOne = "conn1234";
    const connectionTwo = "conn5678";
    const connectionThree = "conn9101";
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
    const otherUserConnectionIds = [connectionTwo, connectionThree];
    const hostConnectionIds = [connectionOne];

    (
      getRoomConnections as jest.MockedFunction<typeof getRoomConnections>
    ).mockResolvedValueOnce(connections);

    (
      getConnectionIdsFromConnections as jest.MockedFunction<
        typeof getConnectionIdsFromConnections
      >
    )
      .mockReturnValueOnce(otherUserConnectionIds)
      .mockReturnValueOnce(hostConnectionIds);

    // Action
    await communicateHostChanged(roomCode, oldHostUsername, newHostUsername);

    // Assert
    expect(getRoomConnections).toHaveBeenCalledWith(roomCode);
    expect(getConnectionIdsFromConnections).toHaveBeenNthCalledWith(1, [
      { username: oldHostUsername },
      { username: anotherUsername },
    ]);
    expect(getConnectionIdsFromConnections).toHaveBeenNthCalledWith(2, [
      { username: newHostUsername },
    ]);
    expect(
      (broadcast as jest.MockedFunction<typeof broadcast>).mock
        .calls[0][0] as string[]
    ).toEqual([connectionTwo, connectionThree]);
    expect(
      (
        (broadcast as jest.MockedFunction<typeof broadcast>).mock
          .calls[0][1] as HostChangeWebsocketEvent
      ).action
    ).toBe("changeHost");
    expect(
      (
        (broadcast as jest.MockedFunction<typeof broadcast>).mock
          .calls[0][1] as HostChangeWebsocketEvent
      ).newHostName
    ).toBe(newHostUsername);
    expect(
      (
        (broadcast as jest.MockedFunction<typeof broadcast>).mock
          .calls[0][1] as HostChangeWebsocketEvent
      ).oldHostname
    ).toBe(oldHostUsername);
    expect(
      (broadcast as jest.MockedFunction<typeof broadcast>).mock
        .calls[1][0] as string[]
    ).toEqual([connectionOne]);
    expect(
      (
        (broadcast as jest.MockedFunction<typeof broadcast>).mock
          .calls[1][1] as HostTransferWebsocketEvent
      ).action
    ).toBe("hostTransfer");
  });
});

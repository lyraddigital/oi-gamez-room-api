import { getRoomConnections, updateRoomStatus } from "@oigamez/repositories";
import { getConnectionIdsFromConnections } from "@oigamez/services";
import { EventBridgeEvent } from "aws-lambda";

import { RoomConnection, RoomStatus } from "/opt/nodejs/oigamez-core";
import { broadcast } from "/opt/nodejs/oigamez-communication";
import { handler } from ".";
import {
  GameStartedWebsocketEvent,
  GameStartedEventReceivedEvent,
} from "./models";

jest.mock("/opt/nodejs/oigamez-communication", () => {
  return {
    ...jest.requireActual("/opt/nodejs/oigamez-communication"),
    broadcast: jest.fn(),
  };
});
jest.mock("@oigamez/repositories");
jest.mock("@oigamez/services");
jest.mock("./configuration");
jest.mock("./services");

describe("game started subscriber handler tests", () => {
  test("makes the correct calls", async () => {
    // Arrange
    const roomCode = "ABCD";
    const roomConnections = [] as RoomConnection[];
    const connectionIds = [] as string[];
    const event = {
      detail: {
        roomCode,
      },
    } as EventBridgeEvent<
      "room-receive.game-started",
      GameStartedEventReceivedEvent
    >;

    (
      getRoomConnections as jest.MockedFunction<typeof getRoomConnections>
    ).mockResolvedValueOnce(roomConnections);

    (
      getConnectionIdsFromConnections as jest.MockedFunction<
        typeof getConnectionIdsFromConnections
      >
    ).mockReturnValueOnce(connectionIds);

    // Action
    await handler(event);

    // Assert
    expect(getRoomConnections).toHaveBeenCalledWith(roomCode);
    expect(getConnectionIdsFromConnections).toHaveBeenCalledWith(
      roomConnections
    );
    expect(updateRoomStatus).toHaveBeenCalledWith(
      roomCode,
      RoomStatus.inProgress
    );
    expect(broadcast).toHaveBeenCalled();
    expect(
      (broadcast as jest.MockedFunction<typeof broadcast>).mock
        .calls[0][0] as string[]
    ).toEqual(connectionIds);
    expect(
      (
        (broadcast as jest.MockedFunction<typeof broadcast>).mock
          .calls[0][1] as GameStartedWebsocketEvent
      ).action
    ).toBe("gameStarted");
  });
});

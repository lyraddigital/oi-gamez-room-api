import {
  GameStartedCommunicationEvent,
  broadcast,
} from "@oigamez/communication";
import {
  EventBridgeReceivedEventType,
  GameStartedEvent,
} from "@oigamez/event-bridge";
import { getRoomConnections, updateRoomStatus } from "@oigamez/repositories";
import { EventBridgeEvent } from "aws-lambda";

import { handler } from ".";
import { RoomConnection, RoomStatus } from "@oigamez/models";

jest.mock("@oigamez/communication", () => {
  return {
    ...jest.requireActual("@oigamez/communication"),
    broadcast: jest.fn(),
  };
});
jest.mock("@oigamez/repositories");
jest.mock("./configuration");

describe("game started subscriber handler tests", () => {
  test("makes the correct calls", async () => {
    // Arrange
    const roomCode = "ABCD";
    const roomConnections = [] as RoomConnection[];
    const event = {
      detail: {
        roomCode,
      },
    } as EventBridgeEvent<
      EventBridgeReceivedEventType.gameStarted,
      GameStartedEvent
    >;

    (
      getRoomConnections as jest.MockedFunction<typeof getRoomConnections>
    ).mockResolvedValueOnce(roomConnections);

    // Action
    await handler(event);

    // Assert
    expect(getRoomConnections).toHaveBeenCalledWith(roomCode);
    expect(updateRoomStatus).toHaveBeenCalledWith(
      roomCode,
      RoomStatus.inProgress
    );
    expect(broadcast).toHaveBeenCalled();
    expect(
      (broadcast as jest.MockedFunction<typeof broadcast>).mock
        .calls[0][0] as RoomConnection[]
    ).toEqual(roomConnections);
    expect(
      (
        (broadcast as jest.MockedFunction<typeof broadcast>).mock
          .calls[0][1] as GameStartedCommunicationEvent
      ).action
    ).toBe("gameStarted");
  });
});

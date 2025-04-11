import { EventBridgeEvent } from "aws-lambda";

import { RoomConnection, RoomStatus } from "/opt/nodejs/oigamez-core.js";
import { broadcast } from "/opt/nodejs/oigamez-communication.js";
import {
  getRoomConnections,
  updateRoomStatus,
} from "/opt/nodejs/oigamez-data.js";
import { getConnectionIdsFromConnections } from "/opt/nodejs/oigamez-services.js";
import { handler } from "./index.js";
import {
  GameInitializedWebsocketEvent,
  GameInitializedEventReceivedEvent,
} from "./models/index.js";

jest.mock("/opt/nodejs/oigamez-communication.js", () => {
  return {
    ...jest.requireActual("/opt/nodejs/oigamez-communication.js"),
    broadcast: jest.fn(),
  };
});
jest.mock("/opt/nodejs/oigamez-data.js");
jest.mock("/opt/nodejs/oigamez-services.js");
jest.mock("./configuration/index.js");
jest.mock("./services/index.js");

describe("game initialized subscriber handler tests", () => {
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
      "room-receive.game-initialized",
      GameInitializedEventReceivedEvent
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
      RoomStatus.available
    );
    expect(broadcast).toHaveBeenCalled();
    expect(
      (broadcast as jest.MockedFunction<typeof broadcast>).mock
        .calls[0][0] as string[]
    ).toEqual(connectionIds);
    expect(
      (
        (broadcast as jest.MockedFunction<typeof broadcast>).mock
          .calls[0][1] as GameInitializedWebsocketEvent
      ).action
    ).toBe("gameInitialized");
  });
});

import { Room } from "/opt/nodejs/oigamez-core.js";
import {
  publishInternalEvents,
  UserLeftInternalEventBridgeEvent,
} from "/opt/nodejs/oigamez-communication.js";
import { removeUserFromRoom } from "/opt/nodejs/oigamez-data.js";

import { handleUserLeft } from "./user-left.service.js";

jest.mock("/opt/nodejs/oigamez-communication", () => {
  return {
    ...jest.requireActual("/opt/nodejs/oigamez-communication"),
    publishInternalEvents: jest.fn(),
  };
});
jest.mock("/opt/nodejs/oigamez-data.js");

describe("handleUserLeft tests", () => {
  test("Calls the correct mock methods", async () => {
    // Arrange
    const roomCode = "ABCD";
    const username = "daryl_duck";
    const connectionId = "conn123";
    const gameTypeId = 1;
    const room = {
      code: roomCode,
    } as Room;

    // Action
    await handleUserLeft(room, username, connectionId, gameTypeId);

    // Assert
    expect(removeUserFromRoom).toHaveBeenCalledWith(room, username);
    expect(
      (
        (
          publishInternalEvents as jest.MockedFunction<
            typeof publishInternalEvents
          >
        ).mock.calls[0][0][0] as UserLeftInternalEventBridgeEvent
      ).roomCode
    ).toBe(roomCode);
    expect(
      (
        (
          publishInternalEvents as jest.MockedFunction<
            typeof publishInternalEvents
          >
        ).mock.calls[0][0][0] as UserLeftInternalEventBridgeEvent
      ).username
    ).toBe(username);
    expect(
      (
        (
          publishInternalEvents as jest.MockedFunction<
            typeof publishInternalEvents
          >
        ).mock.calls[0][0][0] as UserLeftInternalEventBridgeEvent
      ).connectionId
    ).toBe(connectionId);
    expect(
      (
        (
          publishInternalEvents as jest.MockedFunction<
            typeof publishInternalEvents
          >
        ).mock.calls[0][0][0] as UserLeftInternalEventBridgeEvent
      ).gameTypeId
    ).toBe(gameTypeId);
    expect(
      (
        (
          publishInternalEvents as jest.MockedFunction<
            typeof publishInternalEvents
          >
        ).mock.calls[0][0][0] as UserLeftInternalEventBridgeEvent
      ).detailType
    ).toBe("room-internal.user-left");
  });
});

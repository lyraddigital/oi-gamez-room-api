import { HostChangeInternalEvent } from "/opt/nodejs/oigamez-communication";
import { EventBridgeEvent } from "aws-lambda";

import { handler } from ".";
import {
  communicateHostChanged,
  publishExternalHostChangedEvent,
} from "./services";

jest.mock("./configuration");
jest.mock("./services");

describe("host changed subscriber handler tests", () => {
  test("makes the correct calls", async () => {
    // Arrange
    const roomCode = "ABCD";
    const oldHostUsername = "daryl_duck";
    const newHostUsername = "daryl_duck2";
    const gameTypeId = 1;
    const event = {
      detail: {
        roomCode,
        oldHostUsername,
        newHostUsername,
        gameTypeId,
      },
    } as EventBridgeEvent<"room-internal.change-host", HostChangeInternalEvent>;

    // Action
    await handler(event);

    // Assert
    expect(communicateHostChanged).toHaveBeenCalledWith(
      roomCode,
      oldHostUsername,
      newHostUsername
    );
    expect(publishExternalHostChangedEvent).toHaveBeenCalledWith(
      roomCode,
      oldHostUsername,
      newHostUsername,
      gameTypeId
    );
  });
});

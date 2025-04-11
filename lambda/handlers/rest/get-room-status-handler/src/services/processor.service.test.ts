import { convertFromMillisecondsToSeconds } from "/opt/nodejs/oigamez-services.js";

import { CurrentRoomStatus } from "../models/index.js";
import { processStatusRetrieval } from "./processor.service.js";
import { getRoomStatus } from "./get-room-status.service.js";

jest.mock("/opt/nodejs/oigamez-services.js");
jest.mock("./get-room-status.service");

describe("get room status processor tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("makes the correct calls", async () => {
    // Arrange
    const roomCode = "ABCD";
    const requestEpochInMilliseconds = 21600000;
    const ttl = 21600;
    const roomStatus = {
      canJoin: false,
      reason: "Room is full",
    } as CurrentRoomStatus;

    (
      convertFromMillisecondsToSeconds as jest.MockedFunction<
        typeof convertFromMillisecondsToSeconds
      >
    ).mockReturnValueOnce(ttl);
    (
      getRoomStatus as jest.MockedFunction<typeof getRoomStatus>
    ).mockResolvedValueOnce(roomStatus);

    // Action
    const status = await processStatusRetrieval(
      roomCode,
      requestEpochInMilliseconds
    );

    // Assert
    expect(status).toBeDefined();
    expect(status.canJoin).toBe(false);
    expect(status.reason).toBe(roomStatus.reason);
    expect(convertFromMillisecondsToSeconds).toHaveBeenCalledWith(
      requestEpochInMilliseconds
    );
    expect(getRoomStatus).toHaveBeenCalledWith(roomCode, ttl);
  });
});

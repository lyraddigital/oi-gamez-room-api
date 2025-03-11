import { convertFromMillisecondsToSeconds } from "@oigamez/services";

import { CurrentRoomStatus } from "../models";
import { processStatusRetrieval } from "./processor.service";
import { getRoomStatus } from "./get-room-status.service";

jest.mock("@oigamez/services");
jest.mock("./get-room-status.service");

describe("get room status processor tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("makes the correct calls", async () => {
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

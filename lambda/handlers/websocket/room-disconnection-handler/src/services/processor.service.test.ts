import { RoomConnection } from "/opt/nodejs/oigamez-core.js";
import { convertFromMillisecondsToSeconds } from "/opt/nodejs/oigamez-services.js";
import {
  getConnectionById,
  updateConnectionDisconnectionTime,
} from "../repositories/index.js";
import { processDisconnection } from "./processor.service.js";

jest.mock("/opt/nodejs/oigamez-services.js");
jest.mock("../repositories");

describe("processDisconnection for ensure room connection tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("connection not found, will not update the disconnection time", async () => {
    // Arrange
    const connectionId = "con1234";
    const epochTime = 394857;
    const ttl = 39339484;

    (
      convertFromMillisecondsToSeconds as jest.MockedFunction<
        typeof convertFromMillisecondsToSeconds
      >
    ).mockReturnValueOnce(ttl);
    (
      getConnectionById as jest.MockedFunction<typeof getConnectionById>
    ).mockResolvedValueOnce(undefined);

    // Action
    await processDisconnection(connectionId, epochTime);

    // Assert
    expect(convertFromMillisecondsToSeconds).toHaveBeenCalledWith(epochTime);
    expect(getConnectionById).toHaveBeenCalledWith(connectionId);
    expect(updateConnectionDisconnectionTime).not.toHaveBeenCalled();
  });

  test("connection is found, will update the disconnection time", async () => {
    // Arrange
    const connectionId = "con1234";
    const epochTime = 394857;
    const ttl = 39339484;
    const connection = {} as RoomConnection;

    (
      convertFromMillisecondsToSeconds as jest.MockedFunction<
        typeof convertFromMillisecondsToSeconds
      >
    ).mockReturnValueOnce(ttl);
    (
      getConnectionById as jest.MockedFunction<typeof getConnectionById>
    ).mockResolvedValueOnce(connection);

    // Action
    await processDisconnection(connectionId, epochTime);

    // Assert
    expect(convertFromMillisecondsToSeconds).toHaveBeenCalledWith(epochTime);
    expect(getConnectionById).toHaveBeenCalledWith(connectionId);
    expect(updateConnectionDisconnectionTime).toHaveBeenCalledWith(
      connection,
      ttl
    );
  });
});

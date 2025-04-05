import { convertFromMillisecondsToSeconds } from "@oigamez/services";

import { Room, RoomConnection } from "/opt/nodejs/oigamez-core";
import { getRoomByCode, getRoomConnections } from "/opt/nodejs/oigamez-data";
import { ValidationResult } from "/opt/nodejs/oigamez-http";
import { runEnsureRoomConnectionRuleSet } from "../rule-sets";
import { validateRequest } from "../validators";
import { isUserHost } from "./is-user-host.service";
import { verifyRequestData } from "./verification.service";

jest.mock("@oigamez/services");
jest.mock("/opt/nodejs/oigamez-data");
jest.mock("../rule-sets");
jest.mock("../validators");
jest.mock("./is-user-host.service");

describe("verifyRequestData for ensure room connection tests", () => {
  test("validation is unsuccessful, returns unsuccessful", async () => {
    // Arrange
    const roomCode = "ABCD";
    const username = "daryl_duck";
    const epochTime = 2293848;
    const validateResult = {
      isSuccessful: false,
      errorMessages: ["Validation error"],
    } as ValidationResult;

    (
      validateRequest as jest.MockedFunction<typeof validateRequest>
    ).mockReturnValueOnce(validateResult);

    // Action
    const result = await verifyRequestData(username, roomCode, epochTime);

    // Assert
    expect(result.isSuccessful).toBe(false);
    expect(result.errorMessages).toHaveLength(1);
    expect(result.errorMessages[0]).toBe(validateResult.errorMessages[0]);
    expect(result.data).toBeUndefined();
    expect(validateRequest).toHaveBeenCalledWith(username, roomCode);
    expect(convertFromMillisecondsToSeconds).not.toHaveBeenCalled();
    expect(getRoomByCode).not.toHaveBeenCalled();
    expect(getRoomConnections).not.toHaveBeenCalled();
    expect(isUserHost).not.toHaveBeenCalled();
    expect(runEnsureRoomConnectionRuleSet).not.toHaveBeenCalled();
  });

  test("validation passes but ruleset checking is unsuccessful, returns unsuccessful", async () => {
    // Arrange
    const epochTime = 2293848;
    const roomCode = "ABCD";
    const username = "daryl_duck";
    const ttl = 393939484;
    const room = {} as Room;
    const isHost = true;
    const connections = [] as RoomConnection[];
    const validateResult = {
      isSuccessful: true,
      errorMessages: [],
    } as ValidationResult;
    const rulesetResult = {
      isSuccessful: false,
      errorMessages: ["Ruleset error"],
    } as ValidationResult;

    (
      validateRequest as jest.MockedFunction<typeof validateRequest>
    ).mockReturnValueOnce(validateResult);
    (
      convertFromMillisecondsToSeconds as jest.MockedFunction<
        typeof convertFromMillisecondsToSeconds
      >
    ).mockReturnValueOnce(ttl);
    (
      getRoomByCode as jest.MockedFunction<typeof getRoomByCode>
    ).mockResolvedValueOnce(room);
    (
      getRoomConnections as jest.MockedFunction<typeof getRoomConnections>
    ).mockResolvedValueOnce(connections);
    (isUserHost as jest.MockedFunction<typeof isUserHost>).mockReturnValueOnce(
      isHost
    );
    (
      runEnsureRoomConnectionRuleSet as jest.MockedFunction<
        typeof runEnsureRoomConnectionRuleSet
      >
    ).mockReturnValueOnce(rulesetResult);

    // Action
    const result = await verifyRequestData(username, roomCode, epochTime);

    // Assert
    expect(result.isSuccessful).toBe(false);
    expect(result.errorMessages).toHaveLength(1);
    expect(result.errorMessages[0]).toBe(rulesetResult.errorMessages[0]);
    expect(result.data).toBeUndefined();
    expect(validateRequest).toHaveBeenCalledWith(username, roomCode);
    expect(convertFromMillisecondsToSeconds).toHaveBeenCalledWith(epochTime);
    expect(getRoomByCode).toHaveBeenCalledWith(roomCode, ttl);
    expect(getRoomConnections).toHaveBeenCalledWith(roomCode, ttl);
    expect(isUserHost).toHaveBeenCalledWith(room, username);
    expect(runEnsureRoomConnectionRuleSet).toHaveBeenCalledWith(
      isHost,
      room,
      username,
      connections
    );
  });

  test("validation and ruleset passes, returns successful", async () => {
    // Arrange
    const epochTime = 2293848;
    const roomCode = "ABCD";
    const username = "daryl_duck";
    const ttl = 393939484;
    const room = {} as Room;
    const isHost = true;
    const connections = [] as RoomConnection[];
    const validateResult = {
      isSuccessful: true,
      errorMessages: [],
    } as ValidationResult;
    const rulesetResult = {
      isSuccessful: true,
      errorMessages: [],
    } as ValidationResult;

    (
      validateRequest as jest.MockedFunction<typeof validateRequest>
    ).mockReturnValueOnce(validateResult);
    (
      convertFromMillisecondsToSeconds as jest.MockedFunction<
        typeof convertFromMillisecondsToSeconds
      >
    ).mockReturnValueOnce(ttl);
    (
      getRoomByCode as jest.MockedFunction<typeof getRoomByCode>
    ).mockResolvedValueOnce(room);
    (
      getRoomConnections as jest.MockedFunction<typeof getRoomConnections>
    ).mockResolvedValueOnce(connections);
    (isUserHost as jest.MockedFunction<typeof isUserHost>).mockReturnValueOnce(
      isHost
    );
    (
      runEnsureRoomConnectionRuleSet as jest.MockedFunction<
        typeof runEnsureRoomConnectionRuleSet
      >
    ).mockReturnValueOnce(rulesetResult);

    // Action
    const result = await verifyRequestData(username, roomCode, epochTime);

    // Assert
    expect(result.isSuccessful).toBe(true);
    expect(result.errorMessages).toHaveLength(0);
    expect(result.data).toEqual({
      isHost,
      room,
      ttl,
    });
    expect(validateRequest).toHaveBeenCalledWith(username, roomCode);
    expect(convertFromMillisecondsToSeconds).toHaveBeenCalledWith(epochTime);
    expect(getRoomByCode).toHaveBeenCalledWith(roomCode, ttl);
    expect(getRoomConnections).toHaveBeenCalledWith(roomCode, ttl);
    expect(isUserHost).toHaveBeenCalledWith(room, username);
    expect(runEnsureRoomConnectionRuleSet).toHaveBeenCalledWith(
      isHost,
      room,
      username,
      connections
    );
  });
});

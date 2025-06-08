import { Room, RoomConnection } from "@oigamez/core";
import { ValidationResult } from "@oigamez/http";
import {
  convertFromMillisecondsToSeconds,
  getRoomAndConnections,
} from "@oigamez/services";

import { LeaveRoomPayload } from "../models";
import { runLeaveRoomRuleSet } from "../rule-sets";
import { validateRequest } from "../validators";

import { verifyRequestData } from "./verification.service";

jest.mock("@oigamez/services");
jest.mock("../rule-sets");
jest.mock("../validators");

describe("verifyRequest data for leave room tests", () => {
  test("validation does not pass, returns unsuccessful", async () => {
    // Arrange
    const origin = "http://localhost:8000";
    const roomCode = "ABCD";
    const payload = {} as LeaveRoomPayload;
    const requestTimeEpochInMilliseconds = 21000000;
    const validateResult = {
      isSuccessful: false,
      errorMessages: ["Some validation error"],
    } as ValidationResult;

    (
      validateRequest as jest.MockedFunction<typeof validateRequest>
    ).mockReturnValueOnce(validateResult);

    // Action
    const verificationResult = await verifyRequestData(
      origin,
      roomCode,
      payload,
      requestTimeEpochInMilliseconds
    );

    // Assert
    expect(verificationResult.isSuccessful).toBe(false);
    expect(verificationResult.errorMessages).toEqual(
      validateResult.errorMessages
    );
    expect(validateRequest).toHaveBeenCalledWith(origin, roomCode, payload);
    expect(convertFromMillisecondsToSeconds).not.toHaveBeenCalled();
    expect(getRoomAndConnections).not.toHaveBeenCalled();
    expect(runLeaveRoomRuleSet).not.toHaveBeenCalled();
  });

  test("rules does not pass, returns unsuccessful", async () => {
    // Arrange
    const origin = "http://localhost:8000";
    const roomCode = "ABCD";
    const payload = {
      username: "daryl_duck",
    } as LeaveRoomPayload;
    const room = {} as Room;
    const connections = [] as RoomConnection[];
    const requestTimeEpochInMilliseconds = 21000000;
    const ttl = 21000;
    const validateResult = {
      isSuccessful: true,
      errorMessages: [],
    } as ValidationResult;
    const rulesetResult = {
      isSuccessful: false,
      errorMessages: ["Some ruleset error"],
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
      getRoomAndConnections as jest.MockedFunction<typeof getRoomAndConnections>
    ).mockResolvedValue([room, connections]);
    (
      runLeaveRoomRuleSet as jest.MockedFunction<typeof runLeaveRoomRuleSet>
    ).mockReturnValueOnce(rulesetResult);

    // Action
    const ValidationResult = await verifyRequestData(
      origin,
      roomCode,
      payload,
      requestTimeEpochInMilliseconds
    );

    // Assert
    expect(ValidationResult.isSuccessful).toBe(false);
    expect(ValidationResult.errorMessages).toEqual(rulesetResult.errorMessages);
    expect(validateRequest).toHaveBeenCalledWith(origin, roomCode, payload);
    expect(convertFromMillisecondsToSeconds).toHaveBeenCalledWith(
      requestTimeEpochInMilliseconds
    );
    expect(getRoomAndConnections).toHaveBeenCalledWith(roomCode, ttl);
    expect(runLeaveRoomRuleSet).toHaveBeenCalledWith(
      payload.username,
      room,
      connections
    );
  });

  test("all verifications pass, returns successful", async () => {
    // Arrange
    const origin = "http://localhost:8000";
    const roomCode = "ABCD";
    const payload = {
      username: "daryl_duck",
    } as LeaveRoomPayload;
    const room = {} as Room;
    const connections = [] as RoomConnection[];
    const requestTimeEpochInMilliseconds = 21000000;
    const ttl = 21000;
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
      getRoomAndConnections as jest.MockedFunction<typeof getRoomAndConnections>
    ).mockResolvedValue([room, connections]);
    (
      runLeaveRoomRuleSet as jest.MockedFunction<typeof runLeaveRoomRuleSet>
    ).mockReturnValueOnce(rulesetResult);

    // Action
    const ValidationResult = await verifyRequestData(
      origin,
      roomCode,
      payload,
      requestTimeEpochInMilliseconds
    );

    // Assert
    expect(ValidationResult.isSuccessful).toBe(true);
    expect(ValidationResult.errorMessages).toHaveLength(0);
    expect(ValidationResult.data).toEqual([room, connections]);
    expect(validateRequest).toHaveBeenCalledWith(origin, roomCode, payload);
    expect(convertFromMillisecondsToSeconds).toHaveBeenCalledWith(
      requestTimeEpochInMilliseconds
    );
    expect(getRoomAndConnections).toHaveBeenCalledWith(roomCode, ttl);
    expect(runLeaveRoomRuleSet).toHaveBeenCalledWith(
      payload.username,
      room,
      connections
    );
  });
});

import {
  Room,
  RoomConnection,
  VerificationResult,
} from "/opt/nodejs/oigamez-core";
import {
  convertFromMillisecondsToSeconds,
  getRoomAndConnections,
} from "@oigamez/services";

import { JoinRoomPayload } from "../models";
import { runJoinRoomRuleSet } from "../rule-sets";
import { validateRequest } from "../validators";
import { verifyRequestData } from "./verification.service";

jest.mock("@oigamez/services");
jest.mock("../rule-sets");
jest.mock("../validators");

describe("verifyRequest data for join room tests", () => {
  test("validation does not pass, returns unsuccessful", async () => {
    // Arrange
    const origin = "http://localhost:8000";
    const roomCode = "ABCD";
    const payload = {} as JoinRoomPayload;
    const requestTimeEpochInMilliseconds = 21000000;
    const validateResult = {
      isSuccessful: false,
      errorMessages: ["Some validation error"],
    } as VerificationResult;

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
    expect(runJoinRoomRuleSet).not.toHaveBeenCalled();
  });

  test("rules does not pass, returns unsuccessful", async () => {
    // Arrange
    const origin = "http://localhost:8000";
    const roomCode = "ABCD";
    const payload = {
      username: "daryl_duck",
    } as JoinRoomPayload;
    const room = {} as Room;
    const connections = [] as RoomConnection[];
    const requestTimeEpochInMilliseconds = 21000000;
    const ttl = 21000;
    const validateResult = {
      isSuccessful: true,
      errorMessages: [],
    } as VerificationResult;
    const rulesetResult = {
      isSuccessful: false,
      errorMessages: ["Some ruleset error"],
    } as VerificationResult;

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
      runJoinRoomRuleSet as jest.MockedFunction<typeof runJoinRoomRuleSet>
    ).mockReturnValueOnce(rulesetResult);

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
      rulesetResult.errorMessages
    );
    expect(validateRequest).toHaveBeenCalledWith(origin, roomCode, payload);
    expect(convertFromMillisecondsToSeconds).toHaveBeenCalledWith(
      requestTimeEpochInMilliseconds
    );
    expect(getRoomAndConnections).toHaveBeenCalledWith(roomCode, ttl);
    expect(runJoinRoomRuleSet).toHaveBeenCalledWith(
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
    } as JoinRoomPayload;
    const room = {} as Room;
    const connections = [] as RoomConnection[];
    const requestTimeEpochInMilliseconds = 21000000;
    const ttl = 21000;
    const validateResult = {
      isSuccessful: true,
      errorMessages: [],
    } as VerificationResult;
    const rulesetResult = {
      isSuccessful: true,
      errorMessages: [],
    } as VerificationResult;

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
      runJoinRoomRuleSet as jest.MockedFunction<typeof runJoinRoomRuleSet>
    ).mockReturnValueOnce(rulesetResult);

    // Action
    const verificationResult = await verifyRequestData(
      origin,
      roomCode,
      payload,
      requestTimeEpochInMilliseconds
    );

    // Assert
    expect(verificationResult.isSuccessful).toBe(true);
    expect(verificationResult.errorMessages).toHaveLength(0);
    expect(validateRequest).toHaveBeenCalledWith(origin, roomCode, payload);
    expect(convertFromMillisecondsToSeconds).toHaveBeenCalledWith(
      requestTimeEpochInMilliseconds
    );
    expect(getRoomAndConnections).toHaveBeenCalledWith(roomCode, ttl);
    expect(runJoinRoomRuleSet).toHaveBeenCalledWith(
      payload.username,
      room,
      connections
    );
  });
});

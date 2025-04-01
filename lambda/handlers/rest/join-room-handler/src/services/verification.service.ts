import {
  convertFromMillisecondsToSeconds,
  getRoomAndConnections,
} from "@oigamez/services";

import { VerificationResult } from "/opt/nodejs/oigamez-http";

import { JoinRoomPayload } from "../models";
import { runJoinRoomRuleSet } from "../rule-sets";
import { validateRequest } from "../validators";

export const verifyRequestData = async (
  origin: string | undefined,
  roomCode: string | undefined,
  payload: JoinRoomPayload | undefined,
  requestTimeEpochInMilliseconds: number
): Promise<VerificationResult> => {
  const validationResult = validateRequest(origin, roomCode, payload);

  if (!validationResult.isSuccessful) {
    return validationResult;
  }

  const ttl = convertFromMillisecondsToSeconds(requestTimeEpochInMilliseconds);
  const [room, connections] = await getRoomAndConnections(roomCode!, ttl);
  const ruleSetResult = runJoinRoomRuleSet(
    payload!.username!,
    room,
    connections
  );

  if (!ruleSetResult.isSuccessful) {
    return ruleSetResult;
  }

  return { isSuccessful: true, errorMessages: [] };
};

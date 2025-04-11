import { VerificationResult } from "/opt/nodejs/oigamez-http.js";
import {
  convertFromMillisecondsToSeconds,
  getRoomAndConnections,
} from "/opt/nodejs/oigamez-services.js";

import { JoinRoomPayload } from "../models/index.js";
import { runJoinRoomRuleSet } from "../rule-sets/index.js";
import { validateRequest } from "../validators/index.js";

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

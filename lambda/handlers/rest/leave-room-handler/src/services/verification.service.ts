import { Room, RoomConnection } from "/opt/nodejs/oigamez-core.js";
import { VerificationResultWithData } from "/opt/nodejs/oigamez-http.js";
import {
  convertFromMillisecondsToSeconds,
  getRoomAndConnections,
} from "/opt/nodejs/oigamez-services.js";

import { LeaveRoomPayload } from "../models/index.js";
import { runLeaveRoomRuleSet } from "../rule-sets/index.js";
import { validateRequest } from "../validators/index.js";

export const verifyRequestData = async (
  origin: string | undefined,
  roomCode: string | undefined,
  payload: LeaveRoomPayload | undefined,
  requestTimeEpochInMilliseconds: number
): Promise<VerificationResultWithData<[Room, RoomConnection[]]>> => {
  const validationResult = validateRequest(origin, roomCode, payload);

  if (!validationResult.isSuccessful) {
    return validationResult;
  }

  const ttl = convertFromMillisecondsToSeconds(requestTimeEpochInMilliseconds);
  const [room, connections] = await getRoomAndConnections(roomCode!, ttl);
  const ruleSetResult = runLeaveRoomRuleSet(
    payload!.username!,
    room,
    connections
  );

  if (!ruleSetResult.isSuccessful) {
    return ruleSetResult;
  }

  return { isSuccessful: true, errorMessages: [], data: [room!, connections] };
};

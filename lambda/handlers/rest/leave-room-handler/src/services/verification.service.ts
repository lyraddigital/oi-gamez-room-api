import { Room, RoomConnection } from "/opt/nodejs/oigamez-core";
import { VerificationResultWithData } from "/opt/nodejs/oigamez-http";
import {
  convertFromMillisecondsToSeconds,
  getRoomAndConnections,
} from "@oigamez/services";

import { LeaveRoomPayload } from "../models";
import { runLeaveRoomRuleSet } from "../rule-sets";
import { validateRequest } from "../validators";

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

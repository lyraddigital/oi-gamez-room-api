import { Room, VerificationResultWithData } from "/opt/nodejs/oigamez-core";
import { getRoomByCode, getRoomConnections } from "@oigamez/repositories";
import { convertFromMillisecondsToSeconds } from "@oigamez/services";

import { runEnsureRoomConnectionRuleSet } from "../rule-sets";
import { validateRequest } from "../validators";
import { isUserHost } from "./is-user-host.service";

export const verifyRequestData = async (
  username: string | undefined,
  roomCode: string | undefined,
  epochTime: number
): Promise<
  VerificationResultWithData<{ isHost: boolean; room: Room; ttl: number }>
> => {
  const validationResult = validateRequest(username, roomCode);

  if (!validationResult.isSuccessful) {
    return validationResult;
  }

  const ttl = convertFromMillisecondsToSeconds(epochTime);
  const room = await getRoomByCode(roomCode!, ttl);
  const existingConnections = await getRoomConnections(roomCode!, ttl);
  const isHost = isUserHost(room, username);
  const ruleSetResult = runEnsureRoomConnectionRuleSet(
    isHost,
    room,
    username!,
    existingConnections
  );

  if (!ruleSetResult.isSuccessful) {
    return ruleSetResult;
  }

  return {
    isSuccessful: true,
    errorMessages: [],
    data: {
      isHost,
      room: room!,
      ttl,
    },
  };
};

import { Room } from "/opt/nodejs/oigamez-core.js";
import { getRoomByCode, getRoomConnections } from "/opt/nodejs/oigamez-data.js";
import { VerificationResultWithData } from "/opt/nodejs/oigamez-http.js";
import { convertFromMillisecondsToSeconds } from "/opt/nodejs/oigamez-services.js";
import { runEnsureRoomConnectionRuleSet } from "../rule-sets/index.js";
import { validateRequest } from "../validators/index.js";
import { isUserHost } from "./is-user-host.service.js";

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

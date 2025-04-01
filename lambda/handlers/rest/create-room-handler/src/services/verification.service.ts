import { GameType } from "/opt/nodejs/oigamez-core";
import { VerificationResultWithData } from "/opt/nodejs/oigamez-http";

import { CreateRoomPayload } from "../models";
import { getRoomHostingData } from "../repositories";
import { runCreateRoomRuleSet } from "../rule-sets";
import { validateRequest } from "../validators";

export const verifyRequestData = async (
  origin: string | undefined,
  payload: CreateRoomPayload | undefined
): Promise<VerificationResultWithData<GameType>> => {
  const validationResult = validateRequest(origin, payload);

  if (!validationResult.isSuccessful) {
    return validationResult;
  }

  const [gameType, isAlreadyHosting] = await getRoomHostingData(
    payload!.gameTypeId!,
    payload!.hostUsername!
  );

  const ruleSetResult = runCreateRoomRuleSet(gameType, isAlreadyHosting);

  if (!ruleSetResult.isSuccessful) {
    return ruleSetResult;
  }

  return { isSuccessful: true, errorMessages: [], data: gameType };
};

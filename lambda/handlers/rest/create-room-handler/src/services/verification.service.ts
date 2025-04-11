import { GameType } from "@oigamez/core";
import { VerificationResultWithData } from "/opt/nodejs/oigamez-http.js";

import { CreateRoomPayload } from "../models/index.js";
import { getRoomHostingData } from "../repositories/index.js";
import { runCreateRoomRuleSet } from "../rule-sets/index.js";
import { validateRequest } from "../validators/index.js";

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

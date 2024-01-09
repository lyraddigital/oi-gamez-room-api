import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { getRoomAndPlayers } from "@oigamez/repositories";
import {
  badRequestResponse,
  okResponse,
  fatalErrorResponse,
} from "@oigamez/responses";
import { convertFromMillisecondsToSeconds } from "@oigamez/services";

import { validateEnvironment } from "./configuration";
import { validateRequest } from "./validators";
import { runEnsureRoomConnectionRuleSet } from "./rule-sets";

validateEnvironment();

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const username = event?.queryStringParameters
      ? event.queryStringParameters["username"]
      : undefined;
    const roomCode = event?.queryStringParameters
      ? event.queryStringParameters["roomCode"]
      : undefined;
    const epochTime = event.requestContext.requestTimeEpoch;

    const validationResult = validateRequest(username, roomCode);

    if (!validationResult.isSuccessful) {
      return badRequestResponse(validationResult.errorMessages);
    }

    const ttl = convertFromMillisecondsToSeconds(epochTime);
    const [room, users] = await getRoomAndPlayers(roomCode!, ttl);

    const ruleSetResult = runEnsureRoomConnectionRuleSet(
      username!,
      room,
      users
    );

    if (!ruleSetResult.isSuccessful) {
      return badRequestResponse(ruleSetResult.errorMessages);
    }

    return okResponse();
  } catch (e) {
    console.log(e);

    return fatalErrorResponse(
      "Unknown issue while trying to connect the user to the game."
    );
  }
};

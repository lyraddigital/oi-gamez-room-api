import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { UPDATED_CONNECT_WINDOW_IN_SECONDS } from "@oigamez/configuration";
import { getRoomAndUsers } from "@oigamez/repositories";
import {
  badRequestResponse,
  okResponse,
  fatalErrorResponse,
} from "@oigamez/responses";
import { convertFromMillisecondsToSeconds } from "@oigamez/services";

import { validateEnvironment } from "./configuration";
import { establishUserConnection } from "./repositories";
import { runEnsureRoomConnectionRuleSet } from "./rule-sets";
import { isUserHost } from "./services";
import { validateRequest } from "./validators";

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
    const connectionId = event.requestContext.connectionId;
    const epochTime = event.requestContext.requestTimeEpoch;

    const validationResult = validateRequest(username, roomCode);

    if (!validationResult.isSuccessful) {
      return badRequestResponse(validationResult.errorMessages);
    }

    const ttl = convertFromMillisecondsToSeconds(epochTime);
    const [room, users] = await getRoomAndUsers(roomCode!, ttl);
    const isHost = isUserHost(room, username);
    const ruleSetResult = runEnsureRoomConnectionRuleSet(isHost, room, users);

    if (!ruleSetResult.isSuccessful) {
      return badRequestResponse(ruleSetResult.errorMessages);
    }

    const ttlInConnectionWindow = ttl < room!.epochExpiry;
    const adjustedTTL =
      !isHost || !ttlInConnectionWindow
        ? room!.epochExpiry
        : ttl + UPDATED_CONNECT_WINDOW_IN_SECONDS;

    // TODO: Test this logic again when a user joins a room.
    await establishUserConnection(
      room!,
      username!,
      isHost,
      connectionId!,
      ttlInConnectionWindow,
      adjustedTTL
    );

    return okResponse();
  } catch (e) {
    console.log(e);

    return fatalErrorResponse(
      "Unknown issue while trying to connect the user to the room."
    );
  }
};

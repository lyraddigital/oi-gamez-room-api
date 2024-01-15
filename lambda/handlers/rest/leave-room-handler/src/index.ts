import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { getRoomAndUsers } from "@oigamez/repositories";
import {
  corsBadRequestResponse,
  corsOkResponseWithExpiredCookie,
  fatalErrorResponse,
} from "@oigamez/responses";
import {
  convertFromMillisecondsToSeconds,
  getDataFromCookie,
} from "@oigamez/services";

import { validateEnvironment } from "./configuration";
import { removeUserFromRoom } from "./repositories";
import { runLeaveRoomRuleSet } from "./rule-sets";
import { validateRequest } from "./validators";
import { COOKIE_NAME } from "@oigamez/configuration";

validateEnvironment();

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const origin = event?.headers ? event.headers["Origin"] : undefined;
  const requestTimeEpoch = event.requestContext.requestTimeEpoch;
  const roomCode = event.pathParameters
    ? event.pathParameters["roomCode"]
    : undefined;
  const username = getDataFromCookie(event, COOKIE_NAME);

  try {
    const validationResult = validateRequest(origin, roomCode, username);

    if (!validationResult.isSuccessful) {
      return corsBadRequestResponse(validationResult.errorMessages);
    }

    const ttl = convertFromMillisecondsToSeconds(requestTimeEpoch);
    const [room, users] = await getRoomAndUsers(roomCode!, ttl);
    const ruleSetResult = runLeaveRoomRuleSet(username!, room, users);

    if (!ruleSetResult.isSuccessful) {
      return corsBadRequestResponse(ruleSetResult.errorMessages);
    }

    // TODO: We need to prevent the same cookie being sent for the same domain
    // Maybe we put the room code into the cookie name as well as the configured value.
    // Secondly when we are making the host leave before the game starts, we need to remove all users
    // as well as the room data. Not just the host user.
    await removeUserFromRoom(room!, username!);

    return corsOkResponseWithExpiredCookie(204, {});
  } catch (e) {
    console.log(e);

    return fatalErrorResponse(
      "Unexpected error occurred while trying to leave the room."
    );
  }
};

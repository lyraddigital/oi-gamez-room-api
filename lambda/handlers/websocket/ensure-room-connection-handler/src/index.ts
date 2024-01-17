import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { getRoomAndUsers } from "@oigamez/repositories";
import {
  badRequestResponse,
  fatalErrorResponse,
  okResponse,
} from "@oigamez/responses";
import { convertFromMillisecondsToSeconds } from "@oigamez/services";

import { validateEnvironment } from "./configuration";
import {
  establishHostConnection,
  establishJoinerConnection,
} from "./repositories";
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

    if (isHost) {
      await establishHostConnection(room!, username!, connectionId!, ttl);
    } else {
      await establishJoinerConnection(room!, username!, connectionId!);
    }

    return okResponse();
  } catch (e) {
    console.log(e);

    return fatalErrorResponse(
      "Unknown issue while trying to connect the user to the room."
    );
  }
};

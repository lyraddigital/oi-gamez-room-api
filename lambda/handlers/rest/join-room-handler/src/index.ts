import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import {
  corsBadRequestResponse,
  corsOkResponse,
  fatalErrorResponse,
} from "@oigamez/responses";
import {
  convertFromMillisecondsToSeconds,
  getRoomAndConnections,
} from "@oigamez/services";

import { validateEnvironment } from "./configuration";
import { JoinRoomPayload } from "./models";
import { runJoinRoomRuleSet } from "./rule-sets";
import { validateRequest } from "./validators";

validateEnvironment();

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    let payload: JoinRoomPayload | undefined;
    const origin = event?.headers ? event.headers["Origin"] : undefined;
    const requestTimeEpoch = event.requestContext.requestTimeEpoch;
    const roomCode = event.pathParameters
      ? event.pathParameters["roomCode"]
      : undefined;

    if (event.body) {
      try {
        payload = JSON.parse(event.body) as JoinRoomPayload;
      } catch {}
    }

    const validationResult = validateRequest(origin, roomCode, payload);

    if (!validationResult.isSuccessful) {
      return corsBadRequestResponse(validationResult.errorMessages);
    }

    const ttl = convertFromMillisecondsToSeconds(requestTimeEpoch);
    const [room, connections] = await getRoomAndConnections(roomCode!, ttl);
    const ruleSetResult = runJoinRoomRuleSet(
      payload!.username!,
      room,
      connections
    );

    if (!ruleSetResult.isSuccessful) {
      return corsBadRequestResponse(ruleSetResult.errorMessages);
    }

    return corsOkResponse();
  } catch (e) {
    console.log(e);

    return fatalErrorResponse(
      "Unexpected error occurred while trying to join the room."
    );
  }
};

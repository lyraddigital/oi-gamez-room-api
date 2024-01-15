import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import {
  clearRoomData,
  getRoomAndUsers,
  removeUserFromRoom,
} from "@oigamez/repositories";
import {
  corsBadRequestResponse,
  corsOkResponse,
  fatalErrorResponse,
} from "@oigamez/responses";
import { convertFromMillisecondsToSeconds } from "@oigamez/services";

import { validateEnvironment } from "./configuration";
import { LeaveRoomPayload } from "./models";
import { runLeaveRoomRuleSet } from "./rule-sets";
import { validateRequest } from "./validators";

validateEnvironment();

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    let payload: LeaveRoomPayload | undefined;
    const origin = event?.headers ? event.headers["Origin"] : undefined;
    const requestTimeEpoch = event.requestContext.requestTimeEpoch;
    const roomCode = event.pathParameters
      ? event.pathParameters["roomCode"]
      : undefined;

    if (event.body) {
      try {
        payload = JSON.parse(event.body) as LeaveRoomPayload;
      } catch {}
    }

    const validationResult = validateRequest(origin, roomCode, payload);

    if (!validationResult.isSuccessful) {
      return corsBadRequestResponse(validationResult.errorMessages);
    }

    const ttl = convertFromMillisecondsToSeconds(requestTimeEpoch);
    const [room, users] = await getRoomAndUsers(roomCode!, ttl);
    const ruleSetResult = runLeaveRoomRuleSet(payload!.username!, room, users);

    if (!ruleSetResult.isSuccessful) {
      return corsBadRequestResponse(ruleSetResult.errorMessages);
    }

    if (room!.hostUsername === payload!.username!) {
      await clearRoomData(room!, users);
    } else {
      await removeUserFromRoom(room!, payload!.username!);
    }

    return corsOkResponse(204);
  } catch (e) {
    console.log(e);

    return fatalErrorResponse(
      "Unexpected error occurred while trying to leave the room."
    );
  }
};

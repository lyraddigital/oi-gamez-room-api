import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { getRoomAndUsers } from "@oigamez/repositories";
import {
  corsBadRequestResponse,
  corsOkResponseWithCookieData,
  fatalErrorResponse,
} from "@oigamez/responses";
import { convertFromMillisecondsToSeconds } from "@oigamez/services";

import { validateEnvironment } from "./configuration";
import { JoinRoomPayload } from "./models";
import { runJoinRoomRuleSet } from "./rule-sets";
import { validateRequest } from "./validators";

validateEnvironment();

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  let payload: JoinRoomPayload | undefined;
  const origin = event?.headers ? event.headers["Origin"] : undefined;
  const requestTimeEpoch = event.requestContext.requestTimeEpoch;
  const roomCode = event.pathParameters
    ? event.pathParameters["roomCode"]
    : undefined;

  try {
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
    const [room, users] = await getRoomAndUsers(roomCode!, ttl);

    const ruleSetResult = runJoinRoomRuleSet(room, users);

    if (!ruleSetResult.isSuccessful) {
      return corsBadRequestResponse(ruleSetResult.errorMessages);
    }

    // const roomEpochExpiry = incrementAndReturnInSeconds(
    //   event.requestContext.requestTimeEpoch,
    //   CONNECT_WINDOW_IN_SECONDS
    // );
    // const unavailableDivisionAndGroupCodes =
    //   await getAllUnavailableDivisionAndGroupCodes();
    // const [divisionCode, groupCode] = getAnAvailableDivisionAndGroupCode(
    //   unavailableDivisionAndGroupCodes
    // );
    // const [roomCode, isRoomCodeGroupExhaused] = await getUniqueRoomCode(
    //   divisionCode,
    //   groupCode
    // );

    // await createRoom(
    //   {
    //     code: roomCode,
    //     title: payload!.title!,
    //     hostUsername: payload!.hostUsername!,
    //     minNumOfUsers: gameType!.minNumOfUsers,
    //     maxNumOfUsers: gameType!.maxNumOfUsers,
    //     epochExpiry: roomEpochExpiry,
    //     isPublic: payload!.isPublic!,
    //   },
    //   isRoomCodeGroupExhaused
    // );

    return corsOkResponseWithCookieData({}, payload!.username!);
  } catch (e) {
    console.log(e);

    return fatalErrorResponse(
      "Unexpected error occurred while trying to join the room."
    );
  }
};

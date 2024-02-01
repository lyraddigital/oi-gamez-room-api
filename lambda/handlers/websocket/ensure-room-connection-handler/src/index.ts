import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { UserJoinedInternalEvent, publishEvents } from "@oigamez/event-bridge";
import {
  badRequestResponse,
  fatalErrorResponse,
  okResponse,
} from "@oigamez/responses";
import { RoomStatus } from "@oigamez/models";
import { getRoomByCode } from "@oigamez/repositories";
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
    const room = await getRoomByCode(roomCode!, ttl);
    const isHost = isUserHost(room, username);
    const ruleSetResult = runEnsureRoomConnectionRuleSet(isHost, room);

    if (!ruleSetResult.isSuccessful) {
      return badRequestResponse(ruleSetResult.errorMessages);
    }

    if (isHost) {
      const isFirstHostConnection = room!.status === RoomStatus.NotAvailable;

      await establishHostConnection(
        room!,
        username!,
        connectionId!,
        isFirstHostConnection,
        ttl
      );
    } else {
      await establishJoinerConnection(room!, username!, connectionId!);

      if (room!.status === RoomStatus.Available) {
        await publishEvents<UserJoinedInternalEvent>([
          new UserJoinedInternalEvent(room!.code, username!, room!.gameTypeId),
        ]);
      }
    }

    return okResponse();
  } catch (e) {
    console.log(e);

    return fatalErrorResponse(
      "Unknown issue while trying to connect the user to the room."
    );
  }
};

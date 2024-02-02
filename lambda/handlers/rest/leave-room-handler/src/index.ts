import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import {
  RoomRemovedInternalEvent,
  UserLeftInternalEvent,
  publishEvents,
} from "@oigamez/event-bridge";
import { removeRoomAndHost, removeUserFromRoom } from "@oigamez/repositories";
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
    const [room, connections] = await getRoomAndConnections(roomCode!, ttl);
    const ruleSetResult = runLeaveRoomRuleSet(
      payload!.username!,
      room,
      connections
    );

    if (!ruleSetResult.isSuccessful) {
      return corsBadRequestResponse(ruleSetResult.errorMessages);
    }

    if (room!.hostUsername === payload!.username!) {
      if (room!.curNumOfUsers === 1) {
        await removeRoomAndHost(room!.code, payload!.username);

        await publishEvents<RoomRemovedInternalEvent>([
          new RoomRemovedInternalEvent(room!.code, room!.gameTypeId),
        ]);
      }
    } else {
      await removeUserFromRoom(room!, payload!.username!);

      const userConnection = connections.find(
        (c) => c.username === payload!.username!
      );

      await publishEvents<UserLeftInternalEvent>([
        new UserLeftInternalEvent(
          room!.code,
          payload!.username!,
          userConnection!.connectionId,
          room!.gameTypeId
        ),
      ]);
    }

    return corsOkResponse(204);
  } catch (e) {
    console.log(e);

    return fatalErrorResponse(
      "Unexpected error occurred while trying to leave the room."
    );
  }
};

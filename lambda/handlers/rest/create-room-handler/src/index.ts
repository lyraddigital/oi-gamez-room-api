import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { CONNECT_WINDOW_IN_SECONDS } from "@oigamez/configuration";
import {
  corsBadRequestResponse,
  corsOkResponseWithData,
  fatalErrorResponse,
} from "@oigamez/responses";
import { incrementAndReturnInSeconds } from "@oigamez/services";

import { validateEnvironment } from "./configuration";
import { CreateRoomPayload } from "./models";
import {
  createRoom,
  getAllUnavailableDivisionAndGroupCodes,
  getRoomHostingData,
  getUniqueRoomCode,
} from "./repositories";
import { runCreateRoomRuleSet } from "./rule-sets";
import {
  getAnAvailableDivisionAndGroupCode,
  handleErrorResponse,
} from "./services";
import { validateRequest } from "./validators";

validateEnvironment();

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  let payload: CreateRoomPayload | undefined;
  const origin = event?.headers ? event.headers["Origin"] : undefined;

  try {
    if (event.body) {
      try {
        payload = JSON.parse(event.body) as CreateRoomPayload;
      } catch {}
    }

    const validationResult = validateRequest(origin, payload);

    if (!validationResult.isSuccessful) {
      return corsBadRequestResponse(validationResult.errorMessages);
    }

    const [gameType, isAlreadyHosting] = await getRoomHostingData(
      payload!.gameTypeId!,
      payload!.hostUsername!
    );

    const ruleSetResult = runCreateRoomRuleSet(gameType, isAlreadyHosting);

    if (!ruleSetResult.isSuccessful) {
      return corsBadRequestResponse(ruleSetResult.errorMessages);
    }

    const roomEpochExpiry = incrementAndReturnInSeconds(
      event.requestContext.requestTimeEpoch,
      CONNECT_WINDOW_IN_SECONDS
    );
    const unavailableDivisionAndGroupCodes =
      await getAllUnavailableDivisionAndGroupCodes();
    const [divisionCode, groupCode] = getAnAvailableDivisionAndGroupCode(
      unavailableDivisionAndGroupCodes
    );
    const [roomCode, isRoomCodeGroupExhaused] = await getUniqueRoomCode(
      divisionCode,
      groupCode
    );

    await createRoom(
      {
        code: roomCode,
        title: payload!.title!,
        hostUsername: payload!.hostUsername!,
        minNumOfUsers: gameType!.minNumOfUsers,
        maxNumOfUsers: gameType!.maxNumOfUsers,
        epochExpiry: roomEpochExpiry,
        isPublic: payload!.isPublic!,
      },
      isRoomCodeGroupExhaused
    );

    return corsOkResponseWithData({ roomCode });
  } catch (e) {
    console.log(e);

    return fatalErrorResponse(handleErrorResponse(e));
  }
};

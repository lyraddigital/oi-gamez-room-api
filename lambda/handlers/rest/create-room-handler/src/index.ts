import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import {
  corsBadRequestResponse,
  corsOkResponseWithCookieData,
  fatalErrorResponse,
} from "@oigamez/responses";
import { convertFromMillisecondsToSeconds } from "@oigamez/services";

import { validateEnvironment } from "./configuration";
import { CreateRoomPayload } from "./models";
import {
  createRoom,
  getAllUnavailableDivisionAndGroupCodes,
  getUniqueRoomCode,
} from "./repositories";
import {
  getAnAvailableDivisionAndGroupCode,
  handleErrorResponse,
} from "./services";
import { validateRequest } from "./validators";

validateEnvironment();

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  let username: string | undefined;
  const origin = event?.headers ? event.headers["Origin"] : undefined;

  try {
    if (event.body) {
      try {
        const payload = JSON.parse(event.body) as CreateRoomPayload;
        username = payload.hostUsername;
      } catch {}
    }

    const validationResult = validateRequest(origin, username);

    if (!validationResult.isSuccessful) {
      return corsBadRequestResponse(validationResult.errorMessages);
    }

    const roomEpochExpiry = convertFromMillisecondsToSeconds(
      event.requestContext.requestTimeEpoch
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
        hostUsername: username!,
        epochExpiry: roomEpochExpiry,
      },
      isRoomCodeGroupExhaused
    );

    return corsOkResponseWithCookieData({ roomCode }, username!);
  } catch (e) {
    console.log(e);

    return fatalErrorResponse(handleErrorResponse(e));
  }
};

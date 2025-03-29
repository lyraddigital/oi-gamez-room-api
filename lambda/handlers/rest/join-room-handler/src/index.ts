import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { extractFromPath, extractHeader, parseBody } from "@oigamez/requests";
import {
  corsBadRequestResponse,
  corsOkResponseWithData,
  fatalErrorResponse,
} from "@oigamez/responses";

import { validateEnvironment } from "./configuration";
import { JoinRoomPayload } from "./models";
import { processRoomJoin, verifyRequestData } from "./services";

validateEnvironment();

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const origin = extractHeader(event, "Origin");
    const requestTimeEpoch = event.requestContext.requestTimeEpoch;
    const roomCode = extractFromPath(event, "roomCode");
    const payload = parseBody<JoinRoomPayload>(event);
    const verificationResult = await verifyRequestData(
      origin,
      roomCode,
      payload,
      requestTimeEpoch
    );

    if (!verificationResult.isSuccessful) {
      return corsBadRequestResponse(verificationResult.errorMessages);
    }

    const joinResult = processRoomJoin(roomCode!, payload!.username!);

    return corsOkResponseWithData(joinResult);
  } catch (e) {
    console.log(e);

    return fatalErrorResponse(
      "Unexpected error occurred while trying to join the room."
    );
  }
};

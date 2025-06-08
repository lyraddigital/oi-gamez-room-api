import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { CORS_ALLOWED_ORIGINS } from "@oigamez/core";
import {
  corsBadRequestResponse,
  corsOkResponseWithData,
  extractFromPath,
  extractHeader,
  fatalErrorResponse,
  parseBody,
} from "@oigamez/http";

import { validateEnvironment } from "./configuration";
import { JoinRoomPayload } from "./models";
import {
  initializeLambda,
  processRoomJoin,
  verifyRequestData,
} from "./services";

validateEnvironment();
initializeLambda();

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
      return corsBadRequestResponse(
        CORS_ALLOWED_ORIGINS,
        verificationResult.errorMessages
      );
    }

    const joinResult = processRoomJoin(roomCode!, payload!.username!);

    return corsOkResponseWithData(CORS_ALLOWED_ORIGINS, joinResult);
  } catch (e) {
    console.log(e);

    return fatalErrorResponse(
      "Unexpected error occurred while trying to join the room."
    );
  }
};

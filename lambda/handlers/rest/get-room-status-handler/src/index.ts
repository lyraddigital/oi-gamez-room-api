import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { extractFromPath, extractHeader } from "/opt/nodejs/oigamez-http";
import {
  corsBadRequestResponse,
  corsOkResponseWithData,
  fatalErrorResponse,
} from "@oigamez/responses";

import { validateEnvironment } from "./configuration";
import { processStatusRetrieval, verifyRequestData } from "./services";

validateEnvironment();

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const origin = extractHeader(event, "Origin");
    const roomCode = extractFromPath(event, "roomCode");
    const verificationResult = verifyRequestData(origin, roomCode);

    if (!verificationResult.isSuccessful) {
      return corsBadRequestResponse(verificationResult.errorMessages);
    }

    const requestTimeEpoch = event.requestContext.requestTimeEpoch;

    return corsOkResponseWithData(
      await processStatusRetrieval(roomCode!, requestTimeEpoch)
    );
  } catch (e) {
    console.log(e);

    return fatalErrorResponse(
      "Unknown issue while trying to check the status of a room code."
    );
  }
};

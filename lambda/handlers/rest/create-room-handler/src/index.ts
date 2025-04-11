import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { CORS_ALLOWED_ORIGINS, GameType } from "/opt/nodejs/oigamez-core.js";
import {
  extractHeader,
  parseBody,
  corsBadRequestResponse,
  corsOkResponseWithData,
  fatalErrorResponse,
  VerificationResultWithData,
} from "/opt/nodejs/oigamez-http.js";

import { validateEnvironment } from "./configuration/index.js";
import { CreateRoomPayload } from "./models/index.js";
import {
  handleErrorResponse,
  processRoomCreation,
  verifyRequestData,
} from "./services/index.js";

validateEnvironment();

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const payload = parseBody<CreateRoomPayload>(event);
    const origin = extractHeader(event, "Origin");
    const verificationResult = await verifyRequestData(origin, payload);

    if (!verificationResult.isSuccessful) {
      return corsBadRequestResponse(
        CORS_ALLOWED_ORIGINS,
        verificationResult.errorMessages
      );
    }

    const gameType = (
      verificationResult as VerificationResultWithData<GameType>
    ).data!;
    const processRoomResult = await processRoomCreation(
      payload!,
      gameType,
      event.requestContext.requestTimeEpoch
    );

    return corsOkResponseWithData(CORS_ALLOWED_ORIGINS, processRoomResult);
  } catch (e) {
    console.log(e);

    return fatalErrorResponse(handleErrorResponse(e));
  }
};

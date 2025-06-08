import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { CORS_ALLOWED_ORIGINS, GameType } from "@oigamez/core";
import {
  extractHeader,
  parseBody,
  corsBadRequestResponse,
  corsOkResponseWithData,
  fatalErrorResponse,
  VerificationResultWithData,
} from "@oigamez/http";

import { validateEnvironment } from "./configuration";
import { CreateRoomPayload } from "./models";
import {
  handleErrorResponse,
  initializeLambda,
  processRoomCreation,
  verifyRequestData,
} from "./services";

validateEnvironment();
initializeLambda();

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

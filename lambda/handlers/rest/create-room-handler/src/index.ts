import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { extractHeader, parseBody } from "@oigamez/requests";
import {
  corsBadRequestResponse,
  corsOkResponseWithData,
  fatalErrorResponse,
} from "@oigamez/responses";

import { validateEnvironment } from "./configuration";
import { CreateRoomPayload } from "./models";
import {
  handleErrorResponse,
  processRoomCreation,
  verifyRequestData,
} from "./services";

validateEnvironment();

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const payload = parseBody<CreateRoomPayload>(event);
    const origin = extractHeader(event, "Origin");
    const verificationResult = await verifyRequestData(origin, payload);

    if (!verificationResult.isSuccessful) {
      return corsBadRequestResponse(verificationResult.errorMessages);
    }

    const processRoomResult = await processRoomCreation(
      payload!,
      verificationResult.data!,
      event.requestContext.requestTimeEpoch
    );

    return corsOkResponseWithData(processRoomResult);
  } catch (e) {
    console.log(e);

    return fatalErrorResponse(handleErrorResponse(e));
  }
};

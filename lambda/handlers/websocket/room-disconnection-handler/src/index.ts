import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { okResponse } from "/opt/nodejs/oigamez-http";
import { validateEnvironment } from "./configuration";
import { processDisconnection } from "./services";

validateEnvironment();

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const connectionId = event.requestContext.connectionId;
    const epochTime = event.requestContext.requestTimeEpoch;

    await processDisconnection(connectionId!, epochTime);
  } catch (e) {
    console.log(e);
  }

  return okResponse();
};

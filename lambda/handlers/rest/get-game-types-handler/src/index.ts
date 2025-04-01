import { APIGatewayProxyResult } from "aws-lambda";

import { CORS_ALLOWED_ORIGINS } from "/opt/nodejs/oigamez-core";
import {
  corsOkResponseWithData,
  fatalErrorResponse,
} from "/opt/nodejs/oigamez-http";
import { validateEnvironment } from "./configuration";
import { getAllGameTypes } from "./repositories";

validateEnvironment();

export const handler = async (): Promise<APIGatewayProxyResult> => {
  try {
    return corsOkResponseWithData(
      CORS_ALLOWED_ORIGINS,
      await getAllGameTypes()
    );
  } catch (e) {
    console.log(e);

    return fatalErrorResponse(
      "Unknown issue while trying to get all the game types."
    );
  }
};

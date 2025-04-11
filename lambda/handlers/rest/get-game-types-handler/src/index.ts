import { APIGatewayProxyResult } from "aws-lambda";

import { CORS_ALLOWED_ORIGINS } from "/opt/nodejs/oigamez-core.js";
import {
  corsOkResponseWithData,
  fatalErrorResponse,
} from "/opt/nodejs/oigamez-http.js";
import { validateEnvironment } from "./configuration/index.js";
import { getAllGameTypes } from "./repositories/index.js";

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

import { APIGatewayProxyResult } from "aws-lambda";

import { corsOkResponseWithData, fatalErrorResponse } from "@oigamez/responses";

import { validateEnvironment } from "./configuration";
import { getAllGameTypes } from "./repositories";

validateEnvironment();

export const handler = async (): Promise<APIGatewayProxyResult> => {
  try {
    return corsOkResponseWithData(await getAllGameTypes());
  } catch (e) {
    console.log(e);

    return fatalErrorResponse(
      "Unknown issue while trying to get all the game types."
    );
  }
};

import { APIGatewayProxyResult } from "aws-lambda";

import { corsOkResponseWithData, fatalErrorResponse } from "@oigamez/responses";

import { validateEnvironment } from "./configuration";
import { getPublicRooms } from "./repositories";

validateEnvironment();

export const handler = async (): Promise<APIGatewayProxyResult> => {
  try {
    const publicRooms = await getPublicRooms();

    return corsOkResponseWithData(publicRooms);
  } catch (e) {
    console.log(e);

    return fatalErrorResponse(
      "Unknown issue while trying to get the public rooms to join"
    );
  }
};

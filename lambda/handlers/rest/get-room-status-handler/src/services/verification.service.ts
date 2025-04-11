import { VerificationResult } from "/opt/nodejs/oigamez-http.js";

import { validateRequest } from "../validators/index.js";

export const verifyRequestData = (
  origin: string | undefined,
  roomCode: string | undefined
): VerificationResult => {
  return validateRequest(origin, roomCode);
};

import {
  ENCRYPTION_KEY,
  ENCRYPTION_IV,
  JWT_EXPIRY_IN_MINUTES,
} from "/opt/nodejs/oigamez-core.js";
import {
  encryptCustomDataToString,
  generateAccessToken,
} from "/opt/nodejs/oigamez-security.js";

import { ProcessRoomJoinResponse } from "../models/index.js";

export const processRoomJoin = (
  roomCode: string,
  username: string
): ProcessRoomJoinResponse => {
  const token = generateAccessToken(
    { roomCode, username },
    JWT_EXPIRY_IN_MINUTES
  );
  const websocketSessionId = encryptCustomDataToString(
    ENCRYPTION_KEY,
    ENCRYPTION_IV,
    {
      roomCode,
      username,
    }
  );

  return { token, websocketSessionId };
};

import {
  ENCRYPTION_KEY,
  ENCRYPTION_IV,
  JWT_EXPIRY_IN_MINUTES,
} from "@oigamez/configuration";
import {
  encryptCustomDataToString,
  generateAccessToken,
} from "@oigamez/security";

import { ProcessRoomJoinResponse } from "../models";

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

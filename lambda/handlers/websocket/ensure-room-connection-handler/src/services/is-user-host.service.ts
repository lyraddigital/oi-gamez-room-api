import { Room } from "/opt/nodejs/oigamez-core.js";

export const isUserHost = (room?: Room, username?: string): boolean => {
  if (!room?.hostUsername || !username) {
    return false;
  }

  return room?.hostUsername?.toLowerCase() === username?.toLowerCase();
};

import { Room } from "@oigamez/core";

export const isUserHost = (room?: Room, username?: string): boolean => {
  if (!room?.hostUsername || !username) {
    return false;
  }

  return room?.hostUsername?.toLowerCase() === username?.toLowerCase();
};

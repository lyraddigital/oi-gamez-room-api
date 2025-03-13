import { Room } from "@oigamez/models";

export const isUserHost = (room?: Room, username?: string): boolean => {
  if (!room?.hostUsername || !username) {
    return false;
  }

  return room?.hostUsername?.toLowerCase() === username?.toLowerCase();
};

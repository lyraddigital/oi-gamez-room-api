import { Room } from "@oigamez/models";

export const isUserHost = (room?: Room, username?: string): boolean => {
  return room?.hostUsername?.toLowerCase() == username?.toLowerCase();
};

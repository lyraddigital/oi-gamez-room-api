import { closeConnection } from "/opt/nodejs/oigamez-communication";

export const communicateRoomRemoved = async (
  hostConnectionId?: string
): Promise<void> => {
  if (hostConnectionId) {
    await closeConnection(hostConnectionId);
  }
};

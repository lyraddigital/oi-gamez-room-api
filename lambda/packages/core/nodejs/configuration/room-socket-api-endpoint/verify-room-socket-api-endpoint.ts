import { ROOM_SOCKET_API_ENDPOINT } from "./room-socket-api-endpoint";

export const verifyRoomSocketApiEndpoint = (): void => {
  if (!ROOM_SOCKET_API_ENDPOINT) {
    throw new Error("ROOM_SOCKET_API_ENDPOINT environment variable is not set");
  }
};

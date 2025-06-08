import { ROOM_SOCKET_API_ENDPOINT } from "@oigamez/core";
import { initialize } from "@oigamez/communication";

export const initializeLambda = () => {
  initialize(ROOM_SOCKET_API_ENDPOINT);
};

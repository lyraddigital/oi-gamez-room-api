import { ROOM_SOCKET_API_ENDPOINT } from "/opt/nodejs/oigamez-core";
import { initialize } from "/opt/nodejs/oigamez-communication";

export const initializeLambda = () => {
  initialize(ROOM_SOCKET_API_ENDPOINT);
};

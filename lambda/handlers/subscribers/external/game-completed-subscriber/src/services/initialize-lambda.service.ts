import { ROOM_SOCKET_API_ENDPOINT } from "/opt/nodejs/oigamez-core.js";
import { initialize } from "/opt/nodejs/oigamez-communication.js";

export const initializeLambda = () => {
  initialize(ROOM_SOCKET_API_ENDPOINT);
};

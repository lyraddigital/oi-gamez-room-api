import { initialize } from "@oigamez/communication";

import { ROOM_SOCKET_API_ENDPOINT } from "/opt/nodejs/oigamez-core";

export const initializeLambda = () => {
  initialize(ROOM_SOCKET_API_ENDPOINT);
};

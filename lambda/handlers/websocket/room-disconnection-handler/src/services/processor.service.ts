import { convertFromMillisecondsToSeconds } from "/opt/nodejs/oigamez-services.js";

import {
  getConnectionById,
  updateConnectionDisconnectionTime,
} from "../repositories/index.js";

export const processDisconnection = async (
  connectionId: string,
  epochTime: number
): Promise<void> => {
  const ttl = convertFromMillisecondsToSeconds(epochTime);
  const connection = await getConnectionById(connectionId);

  if (connection) {
    await updateConnectionDisconnectionTime(connection, ttl);
  }
};

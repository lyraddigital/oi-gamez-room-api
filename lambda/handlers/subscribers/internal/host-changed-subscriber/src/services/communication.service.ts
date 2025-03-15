import {
  HostChangeCommunicationEvent,
  HostTransferCommunicationEvent,
  broadcast,
} from "@oigamez/communication";
import { getRoomConnections } from "@oigamez/repositories";

export const communicateHostChanged = async (
  roomCode: string,
  oldHostUsername: string,
  newHostUsername: string
): Promise<void> => {
  const roomConnections = await getRoomConnections(roomCode);
  const otherUserConnections = roomConnections.filter(
    (c) => c.username !== newHostUsername
  );
  const newHostConnections = roomConnections.filter(
    (c) => c.username === newHostUsername
  );

  const hostChangingPromise = broadcast<HostChangeCommunicationEvent>(
    otherUserConnections,
    new HostChangeCommunicationEvent(oldHostUsername, newHostUsername)
  );

  const hostTransferPromise = broadcast<HostTransferCommunicationEvent>(
    newHostConnections,
    new HostTransferCommunicationEvent()
  );

  await Promise.allSettled([hostChangingPromise, hostTransferPromise]);
};

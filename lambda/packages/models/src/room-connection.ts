export interface RoomConnection {
  connectionId: string;
  roomCode: string;
  username: string;
  lastDisconnected?: number;
}

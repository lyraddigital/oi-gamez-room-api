import { RoomStatus } from "./room-status";

export interface Room {
  code: string;
  title: string;
  hostUsername: string;
  isPublic: boolean;
  minNumOfUsers: number;
  maxNumOfUsers: number;
  status: RoomStatus;
}

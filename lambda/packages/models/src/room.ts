import { RoomStatus } from "./room-status";

export interface Room {
  code: string;
  epochExpiry: number;
  title: string;
  hostUsername: string;
  isPublic: boolean;
  curNumOfUsers: number;
  minNumOfUsers: number;
  maxNumOfUsers: number;
  status: RoomStatus;
}

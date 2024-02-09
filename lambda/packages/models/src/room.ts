import { RoomStatus } from "./room-status";

export interface Room {
  code: string;
  createdAt: Date;
  epochExpiry: number;
  title: string;
  hostUsername: string;
  gameTypeId: number;
  isPublic: boolean;
  curNumOfUsers: number;
  minNumOfUsers: number;
  maxNumOfUsers: number;
  status: RoomStatus;
}

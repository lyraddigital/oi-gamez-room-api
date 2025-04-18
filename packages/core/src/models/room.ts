import { RoomStatus } from "./room-status.js";
import { RoomVisiblityType } from "./room-visiblity-type.js";

export interface Room {
  code: string;
  createdAt: Date;
  epochExpiry: number;
  title: string;
  hostUsername: string;
  gameTypeId: number;
  isPublic: boolean;
  visibilityType: RoomVisiblityType;
  curNumOfUsers: number;
  minNumOfUsers: number;
  maxNumOfUsers: number;
  status: RoomStatus;
}

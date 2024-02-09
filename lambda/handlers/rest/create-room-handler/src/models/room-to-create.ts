export interface RoomToCreate {
  code: string;
  createdAt: Date;
  title: string;
  hostUsername: string;
  isPublic: boolean;
  minNumOfUsers: number;
  maxNumOfUsers: number;
  epochExpiry: number;
  gameTypeId: number;
}

export interface RoomToCreate {
  code: string;
  createdAt: number;
  title: string;
  hostUsername: string;
  isPublic: boolean;
  minNumOfUsers: number;
  maxNumOfUsers: number;
  epochExpiry: number;
  gameTypeId: number;
}

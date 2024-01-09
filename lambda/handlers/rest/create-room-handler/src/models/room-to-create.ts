export interface RoomToCreate {
  code: string;
  title: string;
  hostUsername: string;
  isPublic: boolean;
  minNumOfUsers: number;
  maxNumOfUsers: number;
  epochExpiry: number;
}

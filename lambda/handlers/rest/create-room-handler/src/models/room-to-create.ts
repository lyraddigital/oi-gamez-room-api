export interface RoomToCreate {
  code: string;
  title: string;
  hostUsername: string;
  isPublic: boolean;
  epochExpiry: number;
}

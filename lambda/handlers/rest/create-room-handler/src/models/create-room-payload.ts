export interface CreateRoomPayload {
  title?: string;
  hostUsername?: string;
  isPublic?: boolean;
  gameTypeId?: number;
}

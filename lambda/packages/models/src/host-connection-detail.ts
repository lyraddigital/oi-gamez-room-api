import { UserConnectionDetail } from "./user-connection-detail";

export interface HostConnectionDetail extends UserConnectionDetail {
  canRemoveRoom: boolean;
}

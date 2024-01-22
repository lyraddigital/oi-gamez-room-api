import { UserConnectionDetail } from "./user-connection-detail";

export interface HostConnectionDetail extends UserConnectionDetail {
  removeRoom: boolean;
}

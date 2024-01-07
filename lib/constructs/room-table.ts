import { Construct } from "constructs";
import {
  AttributeType,
  StreamViewType,
  TableV2,
} from "aws-cdk-lib/aws-dynamodb";

export class RoomTable extends Construct {
  public table: TableV2;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.table = new TableV2(this, "OIGamezRoomData", {
      partitionKey: { name: "PK", type: AttributeType.STRING },
      sortKey: { name: "SK", type: AttributeType.STRING },
      dynamoStream: StreamViewType.OLD_IMAGE,
      timeToLiveAttribute: "TTL",
    });

    this.table.addGlobalSecondaryIndex({
      indexName: "HostedRooms-index",
      partitionKey: { name: "HostUsername", type: AttributeType.STRING },
      sortKey: { name: "Status", type: AttributeType.STRING },
    });
  }
}

import { Construct } from "constructs";
import { AttributeType, TableV2 } from "aws-cdk-lib/aws-dynamodb";

import { ConnectionTableProps } from "../props/index.js";

export class ConnectionTable extends Construct {
  public table: TableV2;

  constructor(scope: Construct, id: string, props: ConnectionTableProps) {
    super(scope, id);

    this.table = new TableV2(this, "OIGamezRoomConnectionData", {
      partitionKey: { name: "PK", type: AttributeType.STRING },
      sortKey: { name: "SK", type: AttributeType.STRING },
      timeToLiveAttribute: "TTL",
    });

    this.table.addGlobalSecondaryIndex({
      indexName: props.connectionsIndexName,
      partitionKey: { name: "ConnectionId", type: AttributeType.STRING },
      sortKey: { name: "PK", type: AttributeType.STRING },
    });

    this.table.addGlobalSecondaryIndex({
      indexName: props.lastDisconnectedIndexName,
      partitionKey: { name: "LastDisconnected", type: AttributeType.NUMBER },
      sortKey: { name: "PK", type: AttributeType.STRING },
    });
  }
}

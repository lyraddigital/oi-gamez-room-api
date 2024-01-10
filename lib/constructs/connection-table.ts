import { Construct } from "constructs";
import { AttributeType, TableV2 } from "aws-cdk-lib/aws-dynamodb";

export class ConnectionTable extends Construct {
  public table: TableV2;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.table = new TableV2(this, "OIGamezRoomConnectionData", {
      partitionKey: { name: "PK", type: AttributeType.STRING },
      sortKey: { name: "SK", type: AttributeType.STRING },
      timeToLiveAttribute: "TTL",
    });
  }
}

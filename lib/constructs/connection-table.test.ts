import { App, Stack } from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { BillingMode } from "@aws-sdk/client-dynamodb";

import { ConnectionTable } from "./connection-table.js";

describe("Connection table construct tests", () => {
  test("creates the correct resources needed to set up the connection table", () => {
    // Arrange
    const testApp = new App({
      outdir: "cdk.out",
    });
    const stack = new Stack(testApp);
    const connectionsIndexName = "RoomConnectionsIndex";
    const lastDisconnectedIndexName = "LastDisconnectedIndex";

    new ConnectionTable(stack, "ConnectionTable", {
      connectionsIndexName,
      lastDisconnectedIndexName,
    });

    // Action
    const template = Template.fromStack(stack);

    // Assert
    template.hasResourceProperties("AWS::DynamoDB::GlobalTable", {
      AttributeDefinitions: [
        { AttributeName: "PK", AttributeType: "S" },
        { AttributeName: "SK", AttributeType: "S" },
        { AttributeName: "ConnectionId", AttributeType: "S" },
        { AttributeName: "LastDisconnected", AttributeType: "N" },
      ],
      BillingMode: BillingMode.PAY_PER_REQUEST,
      KeySchema: [
        {
          AttributeName: "PK",
          KeyType: "HASH",
        },
        {
          AttributeName: "SK",
          KeyType: "RANGE",
        },
      ],
      GlobalSecondaryIndexes: [
        {
          IndexName: "RoomConnectionsIndex",
          KeySchema: [
            { AttributeName: "ConnectionId", KeyType: "HASH" },
            { AttributeName: "PK", KeyType: "RANGE" },
          ],
          Projection: { ProjectionType: "ALL" },
        },
        {
          IndexName: "LastDisconnectedIndex",
          KeySchema: [
            { AttributeName: "LastDisconnected", KeyType: "HASH" },
            { AttributeName: "PK", KeyType: "RANGE" },
          ],
          Projection: { ProjectionType: "ALL" },
        },
      ],
      Replicas: [
        {
          GlobalSecondaryIndexes: [
            {
              IndexName: "RoomConnectionsIndex",
            },
            {
              IndexName: "LastDisconnectedIndex",
            },
          ],
          Region: {
            Ref: "AWS::Region",
          },
        },
      ],
      TimeToLiveSpecification: {
        AttributeName: "TTL",
        Enabled: true,
      },
    });
  });
});

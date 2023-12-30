#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { OiGamezRoomApiStack } from "../lib/oi-gamez-room-api-stack";

const app = new cdk.App();
new OiGamezRoomApiStack(app, "OiGamezRoomApiStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});

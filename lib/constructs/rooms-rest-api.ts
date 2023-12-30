import { RestApi } from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";

import { ResourcePaths } from "../constants";
import { RoomsRestApiProps } from "../props";

import { GetGameTypesLambda } from "./handlers";

export class RoomsRestApi extends Construct {
  constructor(scope: Construct, id: string, props: RoomsRestApiProps) {
    super(scope, id);

    const api = new RestApi(scope, "RoomsRestApi", {
      description:
        "HTTP API that will keep track of all room related data for all puzzle games on the OI Gamez website",
    });

    const gameTypesResource = api.root.addResource(ResourcePaths.gameTypes);

    new GetGameTypesLambda(this, "GetGameTypesLambda", {
      table: props.table,
      resource: gameTypesResource,
      allowedOrigins: props.allowedOrigins,
    });
  }
}

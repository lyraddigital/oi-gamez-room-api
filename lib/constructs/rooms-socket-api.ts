import { WebSocketApi, WebSocketStage } from "@aws-cdk/aws-apigatewayv2-alpha";
import { WebSocketLambdaIntegration } from "@aws-cdk/aws-apigatewayv2-integrations-alpha";
import { Construct } from "constructs";

import { RoomSocketApiProps } from "../props";
import { EnsureRoomConnectionLambda } from "./handlers";

export class RoomsSocketApi extends Construct {
  public webSocketApi: WebSocketApi;
  public stageName: string;

  constructor(scope: Construct, id: string, props: RoomSocketApiProps) {
    super(scope, id);

    this.webSocketApi = new WebSocketApi(this, "RoomWebsocketAPI", {
      routeSelectionExpression: "$request.body.action",
    });

    const webSocketApiStage = new WebSocketStage(this, "ProductionStage", {
      webSocketApi: this.webSocketApi,
      stageName: "Production",
      autoDeploy: true,
    });

    const ensureRoomLambda = new EnsureRoomConnectionLambda(
      this,
      "EnsureRoomConnectionLambda",
      {
        table: props.table,
      }
    );

    this.webSocketApi.addRoute("$connect", {
      integration: new WebSocketLambdaIntegration(
        "LambdaIntegration",
        ensureRoomLambda.lambdaFunction
      ),
    });

    this.stageName = webSocketApiStage.stageName;
  }
}

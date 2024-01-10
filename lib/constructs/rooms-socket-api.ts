import { WebSocketApi, WebSocketStage } from "aws-cdk-lib/aws-apigatewayv2";
import { WebSocketLambdaIntegration } from "aws-cdk-lib/aws-apigatewayv2-integrations";
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
        connectionTable: props.connectionTable,
        roomTable: props.roomTable,
        updatedConnectWindowInSeconds: props.updatedConnectWindowInSeconds,
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

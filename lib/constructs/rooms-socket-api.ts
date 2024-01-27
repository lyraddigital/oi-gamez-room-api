import { WebSocketApi, WebSocketStage } from "aws-cdk-lib/aws-apigatewayv2";
import { WebSocketLambdaIntegration } from "aws-cdk-lib/aws-apigatewayv2-integrations";
import { Construct } from "constructs";

import { RoomSocketApiProps } from "../props";
import {
  EnsureRoomConnectionLambda,
  RoomDisconnectionLambda,
} from "./handlers";

export class RoomsSocketApi extends Construct {
  public webSocketApi: WebSocketApi;
  public stageName: string;
  public roomWebsocketEndpoint: string;
  public roomWebsocketApiPostArn: string;

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

    this.roomWebsocketEndpoint = `https://${this.webSocketApi.apiId}.execute-api.${props.region}.amazonaws.com/${webSocketApiStage.stageName}`;
    this.roomWebsocketApiPostArn = `arn:aws:execute-api:${props.region}:${props.account}:${this.webSocketApi.apiId}/${webSocketApiStage.stageName}/POST/@connections/*`;

    const ensureRoomLambda = new EnsureRoomConnectionLambda(
      this,
      "EnsureRoomConnectionLambda",
      {
        connectionTable: props.connectionTable,
        roomTable: props.roomTable,
        updatedConnectWindowInSeconds: props.updatedConnectWindowInSeconds,
        roomWebsocketEndpoint: this.roomWebsocketEndpoint,
        roomWebsocketApiPostArn: this.roomWebsocketApiPostArn,
      }
    );

    const disconnectRoomLambda = new RoomDisconnectionLambda(
      this,
      "RoomDisconnectionLambda",
      {
        connectionTable: props.connectionTable,
        connectionTableIndexName: props.connectionTableIndexName,
      }
    );

    this.webSocketApi.addRoute("$connect", {
      integration: new WebSocketLambdaIntegration(
        "LambdaIntegration",
        ensureRoomLambda.lambdaFunction
      ),
    });

    this.webSocketApi.addRoute("$disconnect", {
      integration: new WebSocketLambdaIntegration(
        "LambdaIntegration",
        disconnectRoomLambda.lambdaFunction
      ),
    });

    this.stageName = webSocketApiStage.stageName;
  }
}

import {
  DynamoDBClient,
  QueryCommand,
  QueryCommandOutput,
} from "@aws-sdk/client-dynamodb";

import { dbClient } from "/opt/nodejs/oigamez-data.js";

import { PublicRoom } from "../models/index.js";
import { mapFromDynamoToPublicRoom } from "../mappers/index.js";
import { getPublicRooms } from "./get-public-rooms.js";

jest.mock("/opt/nodejs/oigamez-core.js", () => {
  return {
    ...jest.requireActual("/opt/nodejs/oigamez-core.js"),
    DYNAMO_TABLE_NAME: "SomeTable",
  };
});
jest.mock("../configuration", () => {
  return {
    PUBLIC_ROOMS_TO_RETRIEVE: 2,
    VISIBLE_ROOM_INDEX_NAME: "SomeVisibleRoomIndex",
  };
});
jest.mock("../mappers");

describe("getRoomHostingData tests", () => {
  const sendSpy = jest.spyOn<DynamoDBClient, "send">(dbClient, "send");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("makes the correct query to dynamo db and returns mapped response", async () => {
    // Arrange
    const publicRoom = {} as PublicRoom;
    const queryResponse: QueryCommandOutput = {
      Items: [{}],
      $metadata: {},
    };

    (
      mapFromDynamoToPublicRoom as jest.MockedFunction<
        typeof mapFromDynamoToPublicRoom
      >
    ).mockReturnValueOnce(publicRoom);
    sendSpy.mockReturnValueOnce(queryResponse as any);

    // Action
    const publicRooms = await getPublicRooms();

    // Assert
    expect(publicRooms).toHaveLength(1);
    expect(sendSpy.mock.calls.length).toBe(1);
    expect((sendSpy.mock.calls[0][0] as QueryCommand).input.TableName).toBe(
      "SomeTable"
    );
    expect((sendSpy.mock.calls[0][0] as QueryCommand).input.IndexName).toBe(
      "SomeVisibleRoomIndex"
    );
    expect(
      (sendSpy.mock.calls[0][0] as QueryCommand).input.KeyConditionExpression
    ).toBe("#visibilityType = :visibilityType");
    expect(
      (sendSpy.mock.calls[0][0] as QueryCommand).input.ExpressionAttributeNames
    ).toEqual({ "#visibilityType": "VisibilityType" });
    expect(
      (sendSpy.mock.calls[0][0] as QueryCommand).input.ExpressionAttributeValues
    ).toEqual({ ":visibilityType": { S: "visible" } });
    expect((sendSpy.mock.calls[0][0] as QueryCommand).input.Limit).toBe(2);
  });

  test("query returns no record, returns an empty array", async () => {
    // Arrange
    const queryResponse: QueryCommandOutput = {
      Items: [],
      $metadata: {},
    };

    sendSpy.mockReturnValueOnce(queryResponse as any);

    // Action
    const publicRooms = await getPublicRooms();

    // Assert
    expect(publicRooms).toHaveLength(0);
  });
});

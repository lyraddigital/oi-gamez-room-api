import {
  DynamoDBClient,
  QueryCommand,
  QueryCommandOutput,
} from "@aws-sdk/client-dynamodb";

import { Room, RoomStatus, RoomVisiblityType } from "/opt/nodejs/oigamez-core";
import { dbClient } from "../../dynamodb";
import { mapFromDynamoToRoom } from "../../mappers";

import { getRoomByCode } from "./get-room-by-code";

jest.mock("/opt/nodejs/oigamez-core", () => {
  return {
    ...jest.requireActual("/opt/nodejs/oigamez-core"),
    DYNAMO_TABLE_NAME: "SomeTable",
  };
});
jest.mock("../../mappers");

describe("getRoomByCode tests", () => {
  const sendSpy = jest.spyOn<DynamoDBClient, "send">(dbClient, "send");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("makes the correct query to dynamo db and returns mapped response when no ttl passed", async () => {
    // Arrange
    const roomCode = "ABCD";
    const room: Room = {
      code: roomCode,
      title: "Some Room",
      createdAt: new Date(),
      epochExpiry: 12233,
      hostUsername: "daryl_duck",
      gameTypeId: 1,
      isPublic: true,
      visibilityType: RoomVisiblityType.visible,
      curNumOfUsers: 3,
      minNumOfUsers: 2,
      maxNumOfUsers: 4,
      status: RoomStatus.available,
    };
    const queryResponse: QueryCommandOutput = {
      Items: [{}],
      $metadata: {},
    };

    (
      mapFromDynamoToRoom as jest.MockedFunction<typeof mapFromDynamoToRoom>
    ).mockReturnValue(room);

    sendSpy.mockReturnValueOnce(queryResponse as any);

    // Action
    const result = await getRoomByCode(roomCode);

    // Assert
    expect(sendSpy.mock.calls.length).toBe(1);
    expect((sendSpy.mock.calls[0][0] as QueryCommand).input.TableName).toBe(
      "SomeTable"
    );
    expect(
      (sendSpy.mock.calls[0][0] as QueryCommand).input.KeyConditionExpression
    ).toBe("#pk = :pk AND #sk = :sk");
    expect(
      (sendSpy.mock.calls[0][0] as QueryCommand).input.ExpressionAttributeNames
    ).toEqual({ "#pk": "PK", "#sk": "SK" });
    expect(
      (sendSpy.mock.calls[0][0] as QueryCommand).input.ExpressionAttributeValues
    ).toEqual({ ":pk": { S: `Room#${roomCode}` }, ":sk": { S: "#Metadata" } });
    expect(
      (sendSpy.mock.calls[0][0] as QueryCommand).input.FilterExpression
    ).toBeUndefined();
    expect(result).toBeDefined();
    expect(result).toEqual(room);
  });

  test("makes the correct query to dynamo db and returns mapped response when a ttl is passed", async () => {
    // Arrange
    const roomCode = "ABCD";
    const ttl = 92929283;
    const room: Room = {
      code: roomCode,
      title: "Some Room",
      createdAt: new Date(),
      epochExpiry: 12233,
      hostUsername: "daryl_duck",
      gameTypeId: 1,
      isPublic: true,
      visibilityType: RoomVisiblityType.visible,
      curNumOfUsers: 3,
      minNumOfUsers: 2,
      maxNumOfUsers: 4,
      status: RoomStatus.available,
    };
    const queryResponse: QueryCommandOutput = {
      Items: [{}],
      $metadata: {},
    };

    (
      mapFromDynamoToRoom as jest.MockedFunction<typeof mapFromDynamoToRoom>
    ).mockReturnValue(room);

    sendSpy.mockReturnValueOnce(queryResponse as any);

    // Action
    const result = await getRoomByCode(roomCode, ttl);

    // Assert
    expect(sendSpy.mock.calls.length).toBe(1);
    expect((sendSpy.mock.calls[0][0] as QueryCommand).input.TableName).toBe(
      "SomeTable"
    );
    expect(
      (sendSpy.mock.calls[0][0] as QueryCommand).input.KeyConditionExpression
    ).toBe("#pk = :pk AND #sk = :sk");
    expect(
      (sendSpy.mock.calls[0][0] as QueryCommand).input.ExpressionAttributeNames
    ).toEqual({ "#pk": "PK", "#sk": "SK", "#ttl": "TTL" });
    expect(
      (sendSpy.mock.calls[0][0] as QueryCommand).input.ExpressionAttributeValues
    ).toEqual({
      ":pk": { S: `Room#${roomCode}` },
      ":sk": { S: "#Metadata" },
      ":ttl": { N: ttl.toString() },
    });
    expect(
      (sendSpy.mock.calls[0][0] as QueryCommand).input.FilterExpression
    ).toBe("#ttl > :ttl");
    expect(result).toBeDefined();
    expect(result).toEqual(room);
  });

  test("returns undefined if the query returns an empty array", async () => {
    // Arrange
    const roomCode = "ABCD";
    const queryResponse: QueryCommandOutput = {
      Items: [],
      $metadata: {},
    };

    sendSpy.mockReturnValueOnce(queryResponse as any);

    // Action
    const result = await getRoomByCode(roomCode);

    // Assert
    expect(result).toBeUndefined();
  });
});

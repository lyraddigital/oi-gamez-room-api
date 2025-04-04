import { AttributeValue } from "@aws-sdk/client-dynamodb";

import { RoomStatus, RoomVisiblityType } from "/opt/nodejs/oigamez-core";

import { mapFromDynamoToRoom } from "./room.mapper";

describe("mapFromDynamoToRoom tests", () => {
  test("maps a DynamoDb record to Room correctly", () => {
    // Arrange
    const roomCode = "ABC1";
    const title = "DJ Duckman room";
    const createdAt = "2025-03-02T11:26:41.000Z";
    const epochExpiry = 2343244424234;
    const hostUsername = "dj_duck";
    const isPublic = true;
    const visibilityType = "hidden";
    const currentNumOfUsers = 3;
    const minNumOfUsers = 2;
    const maxNumOfUsers = 4;
    const status = "not available";
    const gameTypeId = 1;
    const dbRecord: Record<string, AttributeValue> = {
      RoomCode: { S: roomCode },
      Title: { S: title },
      CreatedAt: { S: createdAt },
      HostUsername: { S: hostUsername },
      IsPublic: { BOOL: isPublic },
      VisibilityType: { S: visibilityType },
      CurNumberOfUsers: { N: currentNumOfUsers.toString() },
      MinNumberOfUsers: { N: minNumOfUsers.toString() },
      MaxNumberOfUsers: { N: maxNumOfUsers.toString() },
      TTL: { N: epochExpiry.toString() },
      Status: { S: status },
      GameTypeId: { N: gameTypeId.toString() },
    };

    // Action
    const room = mapFromDynamoToRoom(dbRecord);

    // Assert
    expect(room).toBeDefined();
    expect(room.code).toBe(roomCode);
    expect(room.title).toBe(title);
    expect(room.createdAt.toISOString()).toBe("2025-03-02T11:26:41.000Z");
    expect(room.epochExpiry).toBe(epochExpiry);
    expect(room.hostUsername).toBe(hostUsername);
    expect(room.isPublic).toBe(true);
    expect(room.visibilityType).toBe(RoomVisiblityType.hidden);
    expect(room.curNumOfUsers).toBe(currentNumOfUsers);
    expect(room.minNumOfUsers).toBe(minNumOfUsers);
    expect(room.maxNumOfUsers).toBe(maxNumOfUsers);
    expect(room.status).toBe(RoomStatus.notAvailable);
    expect(room.gameTypeId).toBe(gameTypeId);
  });

  test("maps room hidden visibility correctly", () => {
    // Arrange
    const visibilityType = "hidden";
    const dbRecord: Record<string, AttributeValue> = {
      VisibilityType: { S: visibilityType },
    };

    // Action
    const room = mapFromDynamoToRoom(dbRecord);

    // Assert
    expect(room.visibilityType).toBe(RoomVisiblityType.hidden);
  });

  test("maps room visible visibility correctly", () => {
    // Arrange
    const visibilityType = "visible";
    const dbRecord: Record<string, AttributeValue> = {
      VisibilityType: { S: visibilityType },
    };

    // Action
    const room = mapFromDynamoToRoom(dbRecord);

    // Assert
    expect(room.visibilityType).toBe(RoomVisiblityType.visible);
  });

  test("maps room not available status correctly", () => {
    // Arrange
    const status = "not available";
    const dbRecord: Record<string, AttributeValue> = {
      Status: { S: status },
    };

    // Action
    const room = mapFromDynamoToRoom(dbRecord);

    // Assert
    expect(room.status).toBe(RoomStatus.notAvailable);
  });

  test("maps room available status correctly", () => {
    // Arrange
    const status = "available";
    const dbRecord: Record<string, AttributeValue> = {
      Status: { S: status },
    };

    // Action
    const room = mapFromDynamoToRoom(dbRecord);

    // Assert
    expect(room.status).toBe(RoomStatus.available);
  });

  test("maps room inProgress status correctly", () => {
    // Arrange
    const status = "in progress";
    const dbRecord: Record<string, AttributeValue> = {
      Status: { S: status },
    };

    // Action
    const room = mapFromDynamoToRoom(dbRecord);

    // Assert
    expect(room.status).toBe(RoomStatus.inProgress);
  });

  test("maps room completed status correctly", () => {
    // Arrange
    const status = "completed";
    const dbRecord: Record<string, AttributeValue> = {
      Status: { S: status },
    };

    // Action
    const room = mapFromDynamoToRoom(dbRecord);

    // Assert
    expect(room.status).toBe(RoomStatus.completed);
  });
});

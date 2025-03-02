import { AttributeValue } from "@aws-sdk/client-dynamodb";

import { mapFromDynamoToConnection } from "./connection.mapper";

describe("mapFromDynamoToConnection tests", () => {
  it("maps a DynamoDb record to RoomConnection correctly", () => {
    // Arrange
    const connectionId = "conn123456";
    const roomCode = "abc123";
    const username = "dj_duck";
    const lastDisconnected = 1234;
    const dbRecord: Record<string, AttributeValue> = {
      ConnectionId: { S: connectionId },
      RoomCode: { S: roomCode },
      Username: { S: username },
      LastDisconnected: { N: lastDisconnected.toString() },
    };

    // Action
    const roomConnection = mapFromDynamoToConnection(dbRecord);

    // Assert
    expect(roomConnection).toBeDefined();
    expect(roomConnection.connectionId).toBe(connectionId);
    expect(roomConnection.roomCode).toBe(roomCode);
    expect(roomConnection.username).toBe(username);
    expect(roomConnection.lastDisconnected).toBe(lastDisconnected);
  });

  it("no last disconnected value in record, returns undefined for LastDisconnected", () => {
    // Arrange
    const dbRecord: Record<string, AttributeValue> = {};

    // Action
    const roomConnection = mapFromDynamoToConnection(dbRecord);

    // Assert
    expect(roomConnection).toBeDefined();
    expect(roomConnection.lastDisconnected).toBeUndefined();
  });
});

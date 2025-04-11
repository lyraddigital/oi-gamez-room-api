import { Room } from "/opt/nodejs/oigamez-core.js";
import { createOrUpdateRoomConnection } from "./create-or-update-room-connection.js";

jest.mock("/opt/nodejs/oigamez-core.js", () => {
  return {
    CONNECTION_DYNAMO_TABLE_NAME: "ConnectionTable",
  };
});

describe("createOrUpdateRoomConnection tests", () => {
  test("Creates the correct TransactWriteItem", () => {
    // Arrange
    const roomCode = "ABCD";
    const username = "daryl_duck";
    const connectionId = "conn1234";
    const ttl = 30000;
    const room = {
      code: roomCode,
    } as Room;

    // Action
    const transactWriteItem = createOrUpdateRoomConnection(
      room,
      username,
      connectionId,
      ttl
    );

    // Assert
    expect(transactWriteItem.Put).toBeDefined();
    expect(transactWriteItem.Put!.TableName).toBe("ConnectionTable");
    expect(transactWriteItem.Put!.Item).toEqual({
      PK: { S: `Room#${roomCode}` },
      SK: { S: `#User#${username}` },
      RoomCode: { S: roomCode },
      Username: { S: username },
      ConnectionId: { S: connectionId },
      TTL: { N: ttl.toString() },
    });
  });
});

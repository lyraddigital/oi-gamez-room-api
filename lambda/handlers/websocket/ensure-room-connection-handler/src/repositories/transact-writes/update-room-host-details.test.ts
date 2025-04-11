import { Room } from "@oigamez/core";

import { updateRoomHostDetails } from "./update-room-host-details.js";

jest.mock("@oigamez/core", () => {
  return {
    ...jest.requireActual("@oigamez/core"),
    DYNAMO_TABLE_NAME: "RoomTable",
  };
});

describe("updateRoomHostDetails tests", () => {
  test("Creates the correct TransactWriteItem when room is public", () => {
    // Arrange
    const roomCode = "ABCD";
    const isPublic = true;
    const ttl = 30000;
    const room = {
      code: roomCode,
      isPublic,
    } as Room;

    // Action
    const transactWriteItem = updateRoomHostDetails(room, ttl);

    // Assert
    expect(transactWriteItem.Update).toBeDefined();
    expect(transactWriteItem.Update!.TableName).toBe("RoomTable");
    expect(transactWriteItem.Update!.Key!).toEqual({
      PK: { S: `Room#${roomCode}` },
      SK: { S: "#Metadata" },
    });
    expect(transactWriteItem.Update!.UpdateExpression).toBe(
      "SET #ttl = :ttl, #curNumOfUsers = :curNumOfUsers, #visibilityType = :visibilityType"
    );
    expect(transactWriteItem.Update!.ConditionExpression).toBe(
      "attribute_exists(PK) AND attribute_exists(SK)"
    );
    expect(transactWriteItem.Update!.ExpressionAttributeNames).toEqual({
      "#ttl": "TTL",
      "#curNumOfUsers": "CurNumberOfUsers",
      "#visibilityType": "VisibilityType",
    });
    expect(transactWriteItem.Update!.ExpressionAttributeValues).toEqual({
      ":ttl": { N: ttl.toString() },
      ":curNumOfUsers": { N: "1" },
      ":visibilityType": { S: "visible" },
    });
  });

  test("Creates the correct TransactWriteItem when room is not public", () => {
    // Arrange
    const roomCode = "ABCD";
    const isPublic = false;
    const ttl = 30000;
    const room = {
      code: roomCode,
      isPublic,
    } as Room;

    // Action
    const transactWriteItem = updateRoomHostDetails(room, ttl);

    // Assert
    expect(transactWriteItem.Update).toBeDefined();
    expect(transactWriteItem.Update!.TableName).toBe("RoomTable");
    expect(transactWriteItem.Update!.Key!).toEqual({
      PK: { S: `Room#${roomCode}` },
      SK: { S: "#Metadata" },
    });
    expect(transactWriteItem.Update!.UpdateExpression).toBe(
      "SET #ttl = :ttl, #curNumOfUsers = :curNumOfUsers, #visibilityType = :visibilityType"
    );
    expect(transactWriteItem.Update!.ConditionExpression).toBe(
      "attribute_exists(PK) AND attribute_exists(SK)"
    );
    expect(transactWriteItem.Update!.ExpressionAttributeNames).toEqual({
      "#ttl": "TTL",
      "#curNumOfUsers": "CurNumberOfUsers",
      "#visibilityType": "VisibilityType",
    });
    expect(transactWriteItem.Update!.ExpressionAttributeValues).toEqual({
      ":ttl": { N: ttl.toString() },
      ":curNumOfUsers": { N: "1" },
      ":visibilityType": { S: "hidden" },
    });
  });
});

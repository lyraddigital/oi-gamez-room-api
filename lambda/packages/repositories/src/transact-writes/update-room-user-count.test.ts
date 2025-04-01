import { Room } from "/opt/nodejs/oigamez-core";

import { updateRoomUserCount } from "./update-room-user-count";

jest.mock("/opt/nodejs/oigamez-core", () => {
  return {
    ...jest.requireActual("/opt/nodejs/oigamez-core"),
    DYNAMO_TABLE_NAME: "SomeTable",
  };
});

describe("updateRoomUserCount tests", () => {
  test("makes the correct transact write item is created", () => {
    // Arrange
    const roomCode = "ABCD";
    const room: Room = {
      code: roomCode,
      isPublic: true,
      curNumOfUsers: 2,
      maxNumOfUsers: 4,
    } as Room;

    // Action
    const transactWriteItem = updateRoomUserCount(room, 1);

    // Assert
    expect(transactWriteItem).toBeDefined();
    expect(transactWriteItem.Update!.TableName).toBe("SomeTable");
    expect(transactWriteItem.Update!.Key).toEqual({
      PK: { S: `Room#${roomCode}` },
      SK: { S: `#Metadata` },
    });
    expect(transactWriteItem.Update!.UpdateExpression).toBe(
      "ADD #curNumOfUsers :curNumOfUsers SET #visibilityType = :visibilityType"
    );
    expect(transactWriteItem.Update!.ConditionExpression).toEqual(
      "attribute_exists(PK) AND attribute_exists(SK)"
    );
    expect(transactWriteItem.Update!.ExpressionAttributeNames).toEqual({
      "#curNumOfUsers": "CurNumberOfUsers",
      "#visibilityType": "VisibilityType",
    });
    expect(transactWriteItem.Update!.ExpressionAttributeValues).toEqual({
      ":curNumOfUsers": { N: "1" },
      ":visibilityType": { S: "visible" },
    });
  });

  test("makes the correct visiblity is set is the room is now private", () => {
    // Arrange
    const roomCode = "ABCD";
    const room: Room = {
      code: roomCode,
      isPublic: false,
      curNumOfUsers: 2,
      maxNumOfUsers: 4,
    } as Room;

    // Action
    const transactWriteItem = updateRoomUserCount(room, 1);

    // Assert
    expect(
      transactWriteItem.Update!.ExpressionAttributeValues![":visibilityType"].S!
    ).toBe("hidden");
  });

  test("makes the correct visiblity is set is the room if the room is now full", () => {
    // Arrange
    const roomCode = "ABCD";
    const room: Room = {
      code: roomCode,
      isPublic: true,
      curNumOfUsers: 3,
      maxNumOfUsers: 4,
    } as Room;

    // Action
    const transactWriteItem = updateRoomUserCount(room, 1);

    // Assert
    expect(
      transactWriteItem.Update!.ExpressionAttributeValues![":visibilityType"].S!
    ).toBe("hidden");
  });
});

import { Room } from "/opt/nodejs/oigamez-core";

import { updateRoomUserCount } from "./update-room-user-count";

jest.mock("/opt/nodejs/oigamez-core", () => {
  return {
    ...jest.requireActual("/opt/nodejs/oigamez-core"),
    DYNAMO_TABLE_NAME: "RoomTable",
  };
});

describe("updateRoomUserCount tests", () => {
  test("Creates the correct TransactWriteItem when room is public and current number of users will still be below max users", () => {
    // Arrange
    const roomCode = "ABCD";
    const isPublic = true;
    const currentNumberOfUsers = 2;
    const maxNumberOfUsers = 4;
    const room = {
      code: roomCode,
      isPublic,
      curNumOfUsers: currentNumberOfUsers,
      maxNumOfUsers: maxNumberOfUsers,
    } as Room;

    // Action
    const transactWriteItem = updateRoomUserCount(room);

    // Assert
    expect(transactWriteItem.Update).toBeDefined();
    expect(transactWriteItem.Update!.TableName).toBe("RoomTable");
    expect(transactWriteItem.Update!.Key!).toEqual({
      PK: { S: `Room#${roomCode}` },
      SK: { S: "#Metadata" },
    });
    expect(transactWriteItem.Update!.UpdateExpression).toBe(
      "ADD #curNumOfUsers :curNumOfUsers SET #visibilityType = :visibilityType"
    );
    expect(transactWriteItem.Update!.ConditionExpression).toBe(
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

  test("Creates the correct TransactWriteItem when room is public and current number will equal max users", () => {
    // Arrange
    const roomCode = "ABCD";
    const isPublic = true;
    const currentNumberOfUsers = 3;
    const maxNumberOfUsers = 4;
    const room = {
      code: roomCode,
      isPublic,
      curNumOfUsers: currentNumberOfUsers,
      maxNumOfUsers: maxNumberOfUsers,
    } as Room;

    // Action
    const transactWriteItem = updateRoomUserCount(room);

    // Assert
    expect(transactWriteItem.Update).toBeDefined();
    expect(transactWriteItem.Update!.TableName).toBe("RoomTable");
    expect(transactWriteItem.Update!.Key!).toEqual({
      PK: { S: `Room#${roomCode}` },
      SK: { S: "#Metadata" },
    });
    expect(transactWriteItem.Update!.UpdateExpression).toBe(
      "ADD #curNumOfUsers :curNumOfUsers SET #visibilityType = :visibilityType"
    );
    expect(transactWriteItem.Update!.ConditionExpression).toBe(
      "attribute_exists(PK) AND attribute_exists(SK)"
    );
    expect(transactWriteItem.Update!.ExpressionAttributeNames).toEqual({
      "#curNumOfUsers": "CurNumberOfUsers",
      "#visibilityType": "VisibilityType",
    });
    expect(transactWriteItem.Update!.ExpressionAttributeValues).toEqual({
      ":curNumOfUsers": { N: "1" },
      ":visibilityType": { S: "hidden" },
    });
  });

  test("Creates the correct TransactWriteItem when room is private", () => {
    // Arrange
    const roomCode = "ABCD";
    const isPublic = false;
    const currentNumberOfUsers = 3;
    const maxNumberOfUsers = 4;
    const room = {
      code: roomCode,
      isPublic,
      curNumOfUsers: currentNumberOfUsers,
      maxNumOfUsers: maxNumberOfUsers,
    } as Room;

    // Action
    const transactWriteItem = updateRoomUserCount(room);

    // Assert
    expect(transactWriteItem.Update).toBeDefined();
    expect(transactWriteItem.Update!.TableName).toBe("RoomTable");
    expect(transactWriteItem.Update!.Key!).toEqual({
      PK: { S: `Room#${roomCode}` },
      SK: { S: "#Metadata" },
    });
    expect(transactWriteItem.Update!.UpdateExpression).toBe(
      "ADD #curNumOfUsers :curNumOfUsers SET #visibilityType = :visibilityType"
    );
    expect(transactWriteItem.Update!.ConditionExpression).toBe(
      "attribute_exists(PK) AND attribute_exists(SK)"
    );
    expect(transactWriteItem.Update!.ExpressionAttributeNames).toEqual({
      "#curNumOfUsers": "CurNumberOfUsers",
      "#visibilityType": "VisibilityType",
    });
    expect(transactWriteItem.Update!.ExpressionAttributeValues).toEqual({
      ":curNumOfUsers": { N: "1" },
      ":visibilityType": { S: "hidden" },
    });
  });
});

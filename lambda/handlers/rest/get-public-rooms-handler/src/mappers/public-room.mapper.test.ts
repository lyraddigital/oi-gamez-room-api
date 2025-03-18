import { AttributeValue } from "@aws-sdk/client-dynamodb";

import { mapFromDynamoToPublicRoom } from "./public-room.mapper";

describe("mapFromDynamoToPublicRoom tests", () => {
  test("maps a DynamoDb record to GameType correctly", () => {
    // Arrange
    const roomCode = "ABCD";
    const title = "A room";
    const hostUsername = "daryl_duck";
    const curNumOfUsers = 3;
    const maxNumOfUsers = 4;
    const dbRecord: Record<string, AttributeValue> = {
      RoomCode: { S: roomCode },
      Title: { S: title },
      HostUsername: { S: hostUsername },
      CurNumberOfUsers: { N: curNumOfUsers.toString() },
      MaxNumberOfUsers: { N: maxNumOfUsers.toString() },
    };

    // Action
    const publicRoom = mapFromDynamoToPublicRoom(dbRecord);

    // Assert
    expect(publicRoom).toBeDefined();
    expect(publicRoom.code).toBe(roomCode);
    expect(publicRoom.title).toBe(title);
    expect(publicRoom.hostUsername).toBe(hostUsername);
    expect(publicRoom.numberOfUsers).toBe(curNumOfUsers);
    expect(publicRoom.maxNumberOfUsers).toBe(maxNumOfUsers);
  });
});

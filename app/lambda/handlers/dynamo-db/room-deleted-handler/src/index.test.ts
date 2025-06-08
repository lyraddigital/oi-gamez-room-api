import { DynamoDBStreamEvent, DynamoDBRecord } from "aws-lambda";

import { RecordType } from "@oigamez/data";

import { handler } from ".";
import { releaseRoomCode } from "./repositories";

jest.mock("./configuration");
jest.mock("./repositories");

describe("room deleted handler tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("no removal records, no room codes are released", async () => {
    // Arrange
    const records = [{ eventName: "INSERT" }] as DynamoDBRecord[];
    const event = {
      Records: records,
    } as DynamoDBStreamEvent;

    // Action
    await handler(event);

    // Assert
    expect(releaseRoomCode).not.toHaveBeenCalled();
  });

  test("has removal records but no dynamodb object set, no room codes are released", async () => {
    // Arrange
    const records = [{ eventName: "REMOVE" }] as DynamoDBRecord[];
    const event = {
      Records: records,
    } as DynamoDBStreamEvent;

    // Action
    await handler(event);

    // Assert
    expect(releaseRoomCode).not.toHaveBeenCalled();
  });

  test("has removal records but no OldImage object set, no room codes are released", async () => {
    // Arrange
    const records = [{ eventName: "REMOVE", dynamodb: {} }] as DynamoDBRecord[];
    const event = {
      Records: records,
    } as DynamoDBStreamEvent;

    // Action
    await handler(event);

    // Assert
    expect(releaseRoomCode).not.toHaveBeenCalled();
  });

  test("has removal records but there is no type and no roomCode in the OldImage object, no room codes are released", async () => {
    // Arrange
    const records = [
      { eventName: "REMOVE", dynamodb: { OldImage: {} } },
    ] as DynamoDBRecord[];
    const event = {
      Records: records,
    } as DynamoDBStreamEvent;

    // Action
    await handler(event);

    // Assert
    expect(releaseRoomCode).not.toHaveBeenCalled();
  });

  test("has removal records but the type is not set in the OldImage object, no room codes are released", async () => {
    // Arrange
    const roomCode = "ABCD";
    const records = [
      {
        eventName: "REMOVE",
        dynamodb: { OldImage: { RoomCode: { S: roomCode } } },
      },
    ] as DynamoDBRecord[];
    const event = {
      Records: records,
    } as DynamoDBStreamEvent;

    // Action
    await handler(event);

    // Assert
    expect(releaseRoomCode).not.toHaveBeenCalled();
  });

  test("has removal records but the type S Member is not set in the OldImage object, no room codes are released", async () => {
    // Arrange
    const roomCode = "ABCD";
    const records = [
      {
        eventName: "REMOVE",
        dynamodb: {
          OldImage: { RoomCode: { S: roomCode }, Type: { N: RecordType.room } },
        },
      },
    ] as DynamoDBRecord[];
    const event = {
      Records: records,
    } as DynamoDBStreamEvent;

    // Action
    await handler(event);

    // Assert
    expect(releaseRoomCode).not.toHaveBeenCalled();
  });

  test("has removal records but the type S Member is not set to room in the OldImage object, no room codes are released", async () => {
    // Arrange
    const roomCode = "ABCD";
    const records = [
      {
        eventName: "REMOVE",
        dynamodb: {
          OldImage: {
            RoomCode: { S: roomCode },
            Type: { S: RecordType.gameType },
          },
        },
      },
    ] as DynamoDBRecord[];
    const event = {
      Records: records,
    } as DynamoDBStreamEvent;

    // Action
    await handler(event);

    // Assert
    expect(releaseRoomCode).not.toHaveBeenCalled();
  });

  test("has removal records but the room code S Member is not set on the OldImage object, no room codes are released", async () => {
    // Arrange
    const roomCode = "ABCD";
    const records = [
      {
        eventName: "REMOVE",
        dynamodb: {
          OldImage: {
            RoomCode: { N: roomCode },
            Type: { S: RecordType.room },
          },
        },
      },
    ] as DynamoDBRecord[];
    const event = {
      Records: records,
    } as DynamoDBStreamEvent;

    // Action
    await handler(event);

    // Assert
    expect(releaseRoomCode).not.toHaveBeenCalled();
  });

  test("has removal records and all members set correctly on the OldImage object, a room code is released", async () => {
    // Arrange
    const roomCode = "ABCD";
    const records = [
      {
        eventName: "REMOVE",
        dynamodb: {
          OldImage: {
            RoomCode: { S: roomCode },
            Type: { S: RecordType.room },
          },
        },
      },
    ] as DynamoDBRecord[];
    const event = {
      Records: records,
    } as DynamoDBStreamEvent;

    // Action
    await handler(event);

    // Assert
    expect(releaseRoomCode).toHaveBeenCalledWith(roomCode);
  });

  test("multiple room code removals, calls releaseRoomCode multiple times correctly", async () => {
    // Arrange
    const roomCodeOne = "ABCD";
    const roomCodeTwo = "EFGH";
    const roomCodeThree = "IJKL";
    const records = [
      {
        eventName: "REMOVE",
        dynamodb: {
          OldImage: {
            RoomCode: { S: roomCodeOne },
            Type: { S: RecordType.room },
          },
        },
      },
      {
        eventName: "REMOVE",
        dynamodb: {
          OldImage: {
            RoomCode: { S: roomCodeTwo },
            Type: { S: RecordType.room },
          },
        },
      },
      {
        eventName: "REMOVE",
        dynamodb: {
          OldImage: {
            RoomCode: { S: roomCodeThree },
            Type: { S: RecordType.room },
          },
        },
      },
    ] as DynamoDBRecord[];
    const event = {
      Records: records,
    } as DynamoDBStreamEvent;

    // Action
    await handler(event);

    // Assert
    expect(releaseRoomCode).toHaveBeenNthCalledWith(1, roomCodeOne);
    expect(releaseRoomCode).toHaveBeenNthCalledWith(2, roomCodeTwo);
    expect(releaseRoomCode).toHaveBeenNthCalledWith(3, roomCodeThree);
  });
});

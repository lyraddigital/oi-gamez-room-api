import {
  DynamoDBClient,
  TransactWriteItemsCommand,
} from "@aws-sdk/client-dynamodb";

import { dbClient } from "../../dynamodb";
import { removeRoomAndHost } from "./remove-room-and-host";

jest.mock("/opt/nodejs/oigamez-core", () => {
  return {
    DYNAMO_TABLE_NAME: "SomeTable",
    CONNECTION_DYNAMO_TABLE_NAME: "SomeConnectionTable",
  };
});

describe("removeRoomAndHost tests", () => {
  const sendSpy = jest.spyOn<DynamoDBClient, "send">(dbClient, "send");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("makes the correct get to dynamo db transaction write", async () => {
    // Arrange
    const roomCode = "ABCD";
    const username = "daryl_duck";

    sendSpy.mockReturnValueOnce({} as any);

    // Action
    await removeRoomAndHost(roomCode, username);

    // Assert
    expect(sendSpy.mock.calls.length).toBe(1);
    expect(
      (sendSpy.mock.calls[0][0] as TransactWriteItemsCommand).input
        .TransactItems
    ).toEqual([
      {
        Delete: {
          Key: {
            PK: {
              S: `Room#${roomCode}`,
            },
            SK: {
              S: `#User#${username}`,
            },
          },
          TableName: "SomeConnectionTable",
        },
      },
      {
        Delete: {
          Key: {
            PK: {
              S: `Room#${roomCode}`,
            },
            SK: {
              S: `#Metadata`,
            },
          },
          TableName: "SomeTable",
        },
      },
    ]);
  });
});

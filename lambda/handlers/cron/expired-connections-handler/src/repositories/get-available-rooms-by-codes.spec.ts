import {
  AttributeValue,
  BatchGetItemCommand,
  BatchGetItemCommandOutput,
  DynamoDBClient,
} from "@aws-sdk/client-dynamodb";
import { dbClient } from "@oigamez/dynamodb";
import { mapFromDynamoToRoom } from "@oigamez/mappers";

import { getAvailableRoomsByCodes } from "./get-available-rooms-by-codes";

jest.mock("@oigamez/configuration", () => {
  return {
    DYNAMO_TABLE_NAME: "SomeTable",
  };
});
jest.mock("@oigamez/dynamodb", () => {
  return {
    ...jest.requireActual("@oigamez/dynamodb"),
    DYNAMO_GET_ITEMS_PER_PAGE: 2,
  };
});
jest.mock("@oigamez/mappers");

describe("getAvailableRoomsByCodes tests", () => {
  const sendSpy = jest.spyOn<DynamoDBClient, "send">(dbClient, "send");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("normal use cases", () => {
    it("batch get item command returns undefined, returns an empty array", async () => {
      // Arrange
      const roomCodes = ["ABCD", "EFGH"];

      sendSpy.mockResolvedValueOnce({} as never);

      // Action
      const rooms = await getAvailableRoomsByCodes(roomCodes);

      // Assert
      expect(rooms).toHaveLength(0);
      expect(sendSpy).toHaveBeenCalled();
      expect(
        (sendSpy.mock.calls[0][0] as BatchGetItemCommand).input.RequestItems![
          "SomeTable"
        ].Keys
      ).toEqual([
        {
          PK: {
            S: `Room#${roomCodes[0]}`,
          },
          SK: {
            S: "#Metadata",
          },
        },
        {
          PK: {
            S: `Room#${roomCodes[1]}`,
          },
          SK: {
            S: "#Metadata",
          },
        },
      ]);
      expect(mapFromDynamoToRoom).not.toHaveBeenCalled();
    });

    it("batch get item command returns a response with no responses set, returns an empty array", async () => {
      // Arrange
      const roomCodes = ["ABCD", "EFGH"];
      const response = {} as BatchGetItemCommandOutput;

      sendSpy.mockResolvedValueOnce(response as never);

      // Action
      const rooms = await getAvailableRoomsByCodes(roomCodes);

      // Assert
      expect(rooms).toHaveLength(0);
      expect(sendSpy).toHaveBeenCalled();
      expect(
        (sendSpy.mock.calls[0][0] as BatchGetItemCommand).input.RequestItems![
          "SomeTable"
        ].Keys
      ).toEqual([
        {
          PK: {
            S: `Room#${roomCodes[0]}`,
          },
          SK: {
            S: "#Metadata",
          },
        },
        {
          PK: {
            S: `Room#${roomCodes[1]}`,
          },
          SK: {
            S: "#Metadata",
          },
        },
      ]);
      expect(mapFromDynamoToRoom).not.toHaveBeenCalled();
    });

    it("batch get item command returns a response with a responses object but not for the right table, returns an empty array", async () => {
      // Arrange
      const roomCodes = ["ABCD", "EFGH"];
      const response = {
        Responses: {},
      } as BatchGetItemCommandOutput;

      sendSpy.mockResolvedValueOnce(response as never);

      // Action
      const rooms = await getAvailableRoomsByCodes(roomCodes);

      // Assert
      expect(rooms).toHaveLength(0);
      expect(sendSpy).toHaveBeenCalled();
      expect(
        (sendSpy.mock.calls[0][0] as BatchGetItemCommand).input.RequestItems![
          "SomeTable"
        ].Keys
      ).toEqual([
        {
          PK: {
            S: `Room#${roomCodes[0]}`,
          },
          SK: {
            S: "#Metadata",
          },
        },
        {
          PK: {
            S: `Room#${roomCodes[1]}`,
          },
          SK: {
            S: "#Metadata",
          },
        },
      ]);
      expect(mapFromDynamoToRoom).not.toHaveBeenCalled();
    });

    it("batch get item command returns a response with a responses object with result for the correct table, returns an array of mapped responses", async () => {
      // Arrange
      const roomCodes = ["ABCD", "EFGH"];
      const itemOne = {};
      const itemTwo = {};
      const response = {
        Responses: {
          ["SomeTable"]: [itemOne, itemTwo],
        } as Record<string, Record<string, AttributeValue>[]>,
      } as BatchGetItemCommandOutput;

      sendSpy.mockResolvedValueOnce(response as never);
      (mapFromDynamoToRoom as jest.MockedFunction<typeof mapFromDynamoToRoom>)
        .mockReturnValueOnce({} as any)
        .mockReturnValueOnce({} as any);

      // Action
      const rooms = await getAvailableRoomsByCodes(roomCodes);

      // Assert
      expect(rooms).toHaveLength(2);
      expect(sendSpy).toHaveBeenCalled();
      expect(
        (sendSpy.mock.calls[0][0] as BatchGetItemCommand).input.RequestItems![
          "SomeTable"
        ].Keys
      ).toEqual([
        {
          PK: {
            S: `Room#${roomCodes[0]}`,
          },
          SK: {
            S: "#Metadata",
          },
        },
        {
          PK: {
            S: `Room#${roomCodes[1]}`,
          },
          SK: {
            S: "#Metadata",
          },
        },
      ]);
      expect(mapFromDynamoToRoom).toHaveBeenCalledTimes(2);
      expect(
        (mapFromDynamoToRoom as jest.MockedFunction<typeof mapFromDynamoToRoom>)
          .mock.calls[0][0]
      ).toBe(itemOne);
      expect(
        (mapFromDynamoToRoom as jest.MockedFunction<typeof mapFromDynamoToRoom>)
          .mock.calls[1][0]
      ).toBe(itemTwo);
    });
  });

  describe("paging use cases", () => {
    it("4 room codes with paging set at 2 rooms per page, makes 2 batch gets", async () => {
      // Arrange
      const roomCodes = ["ABCD", "EFGH", "IJKL", "MNOP"];
      const itemOne = {};
      const itemTwo = {};
      const itemThree = {};
      const itemFour = {};
      const response = {
        Responses: {
          ["SomeTable"]: [itemOne, itemTwo],
        } as Record<string, Record<string, AttributeValue>[]>,
      } as BatchGetItemCommandOutput;
      const responseTwo = {
        Responses: {
          ["SomeTable"]: [itemThree, itemFour],
        } as Record<string, Record<string, AttributeValue>[]>,
      } as BatchGetItemCommandOutput;

      sendSpy
        .mockResolvedValueOnce(response as never)
        .mockResolvedValueOnce(responseTwo as never);
      (mapFromDynamoToRoom as jest.MockedFunction<typeof mapFromDynamoToRoom>)
        .mockReturnValueOnce({} as any)
        .mockReturnValueOnce({} as any)
        .mockReturnValueOnce({} as any)
        .mockReturnValueOnce({} as any);

      // Action
      const rooms = await getAvailableRoomsByCodes(roomCodes);

      // Assert
      expect(rooms).toHaveLength(4);
      expect(sendSpy).toHaveBeenCalledTimes(2);
      expect(
        (sendSpy.mock.calls[0][0] as BatchGetItemCommand).input.RequestItems![
          "SomeTable"
        ].Keys
      ).toEqual([
        {
          PK: {
            S: `Room#${roomCodes[0]}`,
          },
          SK: {
            S: "#Metadata",
          },
        },
        {
          PK: {
            S: `Room#${roomCodes[1]}`,
          },
          SK: {
            S: "#Metadata",
          },
        },
      ]);
      expect(
        (sendSpy.mock.calls[1][0] as BatchGetItemCommand).input.RequestItems![
          "SomeTable"
        ].Keys
      ).toEqual([
        {
          PK: {
            S: `Room#${roomCodes[2]}`,
          },
          SK: {
            S: "#Metadata",
          },
        },
        {
          PK: {
            S: `Room#${roomCodes[3]}`,
          },
          SK: {
            S: "#Metadata",
          },
        },
      ]);
      expect(mapFromDynamoToRoom).toHaveBeenCalledTimes(4);
      expect(
        (mapFromDynamoToRoom as jest.MockedFunction<typeof mapFromDynamoToRoom>)
          .mock.calls[0][0]
      ).toBe(itemOne);
      expect(
        (mapFromDynamoToRoom as jest.MockedFunction<typeof mapFromDynamoToRoom>)
          .mock.calls[1][0]
      ).toBe(itemTwo);
      expect(
        (mapFromDynamoToRoom as jest.MockedFunction<typeof mapFromDynamoToRoom>)
          .mock.calls[2][0]
      ).toBe(itemThree);
      expect(
        (mapFromDynamoToRoom as jest.MockedFunction<typeof mapFromDynamoToRoom>)
          .mock.calls[3][0]
      ).toBe(itemFour);
    });
  });
});

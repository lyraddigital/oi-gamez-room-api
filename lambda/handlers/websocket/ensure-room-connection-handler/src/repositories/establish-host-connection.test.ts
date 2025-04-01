import {
  TransactWriteItem,
  TransactWriteItemsCommand,
} from "@aws-sdk/client-dynamodb";
import { dbClient } from "@oigamez/dynamodb";

import { Room } from "/opt/nodejs/oigamez-core";
import { establishHostConnection } from "./establish-host-connection";
import {
  createOrUpdateRoomConnection,
  updateRoomHostDetails,
} from "./transact-writes";

jest.mock("@oigamez/dynamodb");

jest.mock("../configuration", () => {
  return {
    UPDATED_CONNECT_WINDOW_IN_SECONDS: 30,
  };
});
jest.mock("./transact-writes", () => {
  return {
    createOrUpdateRoomConnection: jest.fn(),
    updateRoomHostDetails: jest.fn(),
  };
});

describe("establishHostConnection tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("correct command is sent and the correct mock methods are called when this is the first connection", async () => {
    // Arrange
    const createOrUpdateHostItem = {} as TransactWriteItem;
    const updateRoomHostDetailsItem = {} as TransactWriteItem;
    (
      createOrUpdateRoomConnection as jest.MockedFunction<
        typeof createOrUpdateRoomConnection
      >
    ).mockReturnValueOnce(createOrUpdateHostItem);
    (
      updateRoomHostDetails as jest.MockedFunction<typeof updateRoomHostDetails>
    ).mockReturnValueOnce(updateRoomHostDetailsItem);
    const sendSpy = jest.spyOn(dbClient, "send");
    const room = {} as Room;
    const username = "daryl_duck";
    const connectionId = "conn1234";
    const isFirstHostConnection = true;
    const updatedTTL = 1029938;

    // Action
    await establishHostConnection(
      room,
      username,
      connectionId,
      isFirstHostConnection,
      updatedTTL
    );

    // Assert
    expect(createOrUpdateRoomConnection).toHaveBeenCalledWith(
      room,
      username,
      connectionId,
      updatedTTL + 30
    );
    expect(updateRoomHostDetails).toHaveBeenCalledWith(room, updatedTTL + 30);
    expect(sendSpy).toHaveBeenCalled();
    expect(
      (sendSpy.mock.calls[0][0] as TransactWriteItemsCommand).input
        .TransactItems
    ).toHaveLength(2);
    expect(
      (sendSpy.mock.calls[0][0] as TransactWriteItemsCommand).input
        .TransactItems![0]
    ).toBe(createOrUpdateHostItem);
    expect(
      (sendSpy.mock.calls[0][0] as TransactWriteItemsCommand).input
        .TransactItems![1]
    ).toBe(updateRoomHostDetailsItem);
  });

  test("correct command is sent and the correct mock methods are called when this is not the first connection", async () => {
    // Arrange
    const createOrUpdateHostItem = {} as TransactWriteItem;
    (
      createOrUpdateRoomConnection as jest.MockedFunction<
        typeof createOrUpdateRoomConnection
      >
    ).mockReturnValueOnce(createOrUpdateHostItem);
    const sendSpy = jest.spyOn(dbClient, "send");
    const username = "daryl_duck";
    const connectionId = "conn1234";
    const isFirstHostConnection = false;
    const roomExpiry = 1029938;
    const updatedTTL = 39393383;
    const room = {
      epochExpiry: roomExpiry,
    } as Room;

    // Action
    await establishHostConnection(
      room,
      username,
      connectionId,
      isFirstHostConnection,
      updatedTTL
    );

    // Assert
    expect(createOrUpdateRoomConnection).toHaveBeenCalledWith(
      room,
      username,
      connectionId,
      room.epochExpiry
    );
    expect(updateRoomHostDetails).not.toHaveBeenCalled();
    expect(sendSpy).toHaveBeenCalled();
    expect(
      (sendSpy.mock.calls[0][0] as TransactWriteItemsCommand).input
        .TransactItems
    ).toHaveLength(1);
    expect(
      (sendSpy.mock.calls[0][0] as TransactWriteItemsCommand).input
        .TransactItems![0]
    ).toBe(createOrUpdateHostItem);
  });
});

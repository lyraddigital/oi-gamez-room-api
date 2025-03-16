import {
  HostConnectionExpiredInternalEvent,
  publishInternalEvents,
} from "@oigamez/event-bridge";
import { Room, RoomStatus } from "@oigamez/models";

import { publishAllHostExpirations } from "./publish-all-host-expirations.service";

jest.mock("@oigamez/event-bridge", () => {
  return {
    ...jest.requireActual("@oigamez/event-bridge"),
    publishInternalEvents: jest.fn(),
  };
});

describe("publishAllHostExpirations tests", () => {
  it("raises a set of host connection expired events with different shouldRemoveRoom values given the status of the room", async () => {
    // Arrange
    const roomOne = {
      code: "ABCD",
      hostUsername: "daryl_duck",
      status: RoomStatus.available,
      curNumOfUsers: 1,
      gameTypeId: 1,
    } as Room;
    const roomTwo = {
      code: "EFGH",
      hostUsername: "daryl_duck2",
      status: RoomStatus.available,
      curNumOfUsers: 0,
      gameTypeId: 1,
    } as Room;
    const roomThree = {
      code: "IJKL",
      hostUsername: "daryl_duck3",
      status: RoomStatus.available,
      curNumOfUsers: -1,
      gameTypeId: 1,
    } as Room;
    const roomFour = {
      code: "MNOP",
      hostUsername: "daryl_duck4",
      status: RoomStatus.notAvailable,
      curNumOfUsers: 1,
      gameTypeId: 1,
    } as Room;
    const roomFive = {
      code: "QRST",
      hostUsername: "daryl_duck5",
      status: RoomStatus.notAvailable,
      curNumOfUsers: 0,
      gameTypeId: 1,
    } as Room;
    const roomSix = {
      code: "UVWX",
      hostUsername: "daryl_duck6",
      status: RoomStatus.notAvailable,
      curNumOfUsers: -1,
      gameTypeId: 1,
    } as Room;
    const roomSeven = {
      code: "YZAB",
      hostUsername: "daryl_duck7",
      status: RoomStatus.inProgress,
      gameTypeId: 1,
    } as Room;
    const roomEight = {
      code: "CDEF",
      hostUsername: "daryl_duck8",
      status: RoomStatus.completed,
      gameTypeId: 1,
    } as Room;
    const hostedRooms = [
      roomOne,
      roomTwo,
      roomThree,
      roomFour,
      roomFive,
      roomSix,
      roomSeven,
      roomEight,
    ];

    (
      publishInternalEvents as jest.MockedFunction<typeof publishInternalEvents>
    ).mockResolvedValueOnce({} as never);

    // Action
    await publishAllHostExpirations(hostedRooms);

    expect(publishInternalEvents).toHaveBeenCalledTimes(1);
    expect(
      (
        (
          publishInternalEvents as jest.MockedFunction<
            typeof publishInternalEvents
          >
        ).mock.calls[0][0][0] as HostConnectionExpiredInternalEvent
      ).shouldRemoveRoom
    ).toBe(false);
    expect(
      (
        (
          publishInternalEvents as jest.MockedFunction<
            typeof publishInternalEvents
          >
        ).mock.calls[0][0][1] as HostConnectionExpiredInternalEvent
      ).shouldRemoveRoom
    ).toBe(true);
    expect(
      (
        (
          publishInternalEvents as jest.MockedFunction<
            typeof publishInternalEvents
          >
        ).mock.calls[0][0][2] as HostConnectionExpiredInternalEvent
      ).shouldRemoveRoom
    ).toBe(true);
    expect(
      (
        (
          publishInternalEvents as jest.MockedFunction<
            typeof publishInternalEvents
          >
        ).mock.calls[0][0][3] as HostConnectionExpiredInternalEvent
      ).shouldRemoveRoom
    ).toBe(false);
    expect(
      (
        (
          publishInternalEvents as jest.MockedFunction<
            typeof publishInternalEvents
          >
        ).mock.calls[0][0][4] as HostConnectionExpiredInternalEvent
      ).shouldRemoveRoom
    ).toBe(true);
    expect(
      (
        (
          publishInternalEvents as jest.MockedFunction<
            typeof publishInternalEvents
          >
        ).mock.calls[0][0][5] as HostConnectionExpiredInternalEvent
      ).shouldRemoveRoom
    ).toBe(true);
    expect(
      (
        (
          publishInternalEvents as jest.MockedFunction<
            typeof publishInternalEvents
          >
        ).mock.calls[0][0][6] as HostConnectionExpiredInternalEvent
      ).shouldRemoveRoom
    ).toBe(false);
    expect(
      (
        (
          publishInternalEvents as jest.MockedFunction<
            typeof publishInternalEvents
          >
        ).mock.calls[0][0][7] as HostConnectionExpiredInternalEvent
      ).shouldRemoveRoom
    ).toBe(false);

    hostedRooms.forEach((r, i) => {
      const event = (
        publishInternalEvents as jest.MockedFunction<
          typeof publishInternalEvents
        >
      ).mock.calls[0][0][i] as HostConnectionExpiredInternalEvent;

      expect(event.detailType).toBe("room-internal.host-connection-expired");
      expect(event.gameTypeId).toBe(r.gameTypeId);
      expect(event.roomCode).toBe(r.code);
      expect(event.username).toBe(r.hostUsername);
    });
  });
});

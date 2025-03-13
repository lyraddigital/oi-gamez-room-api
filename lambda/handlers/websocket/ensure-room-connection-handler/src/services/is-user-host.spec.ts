import { Room } from "@oigamez/models";

import { isUserHost } from "./is-user-host";

describe("isUserHost tests", () => {
  it("room and username is undefined, returns false", () => {
    // Arrange / Action
    const isHost = isUserHost(undefined, undefined);

    // Assert
    expect(isHost).toBe(false);
  });

  it("room host username and username is undefined, returns false", () => {
    // Arrange
    const room = {} as Room;

    // Action
    const isHost = isUserHost(room, undefined);

    // Assert
    expect(isHost).toBe(false);
  });

  it("room is undefined, but username is set, returns false", () => {
    // Arrange
    const username = "daryl_duck";

    // Action
    const isHost = isUserHost(undefined, username);

    // Assert
    expect(isHost).toBe(false);
  });

  it("room host username is undefined, but username is set, returns false", () => {
    // Arrange
    const room = {} as Room;
    const username = "daryl_duck";

    // Action
    const isHost = isUserHost(room, username);

    // Assert
    expect(isHost).toBe(false);
  });

  it("room is set, but username undefined, returns false", () => {
    // Arrange
    const room = {
      hostUsername: "daryl_duck",
    } as Room;

    // Action
    const isHost = isUserHost(room, undefined);

    // Assert
    expect(isHost).toBe(false);
  });

  it("room and username were set, but host name and username do not match, returns false", () => {
    // Arrange
    const room = {
      hostUsername: "daryl_duck",
    } as Room;
    const username = "daryl_duck2";

    // Action
    const isHost = isUserHost(room, username);

    // Assert
    expect(isHost).toBe(false);
  });

  it("room and username were set, with the host name and username matching, returns true", () => {
    // Arrange
    const room = {
      hostUsername: "daryl_duck",
    } as Room;
    const username = "daryl_duck";

    // Action
    const isHost = isUserHost(room, username);

    // Assert
    expect(isHost).toBe(true);
  });

  it("host name and username does a case insensitive match, returns true", () => {
    // Arrange
    const room = {
      hostUsername: "DARYL_DUCK",
    } as Room;
    const username = "daryl_duck";

    // Action
    const isHost = isUserHost(room, username);

    // Assert
    expect(isHost).toBe(true);
  });
});

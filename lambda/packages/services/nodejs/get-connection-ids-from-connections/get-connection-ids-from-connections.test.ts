import { RoomConnection } from "/opt/nodejs/oigamez-core.js";

import { getConnectionIdsFromConnections } from "./get-connection-ids-from-connections.service.js";

describe("getConnectionIdsFromConnections tests", () => {
  test("Correct reponse is generated with correct status code", () => {
    // Arrange
    const connectionIdOne = "conn1234";
    const connectionIdTwo = "conn5678";
    const connectionIdThree = "conn9101";
    const connectionIdFour = "conn1121";
    const roomConnections = [
      {
        connectionId: connectionIdOne,
      } as RoomConnection,
      {
        connectionId: connectionIdTwo,
      } as RoomConnection,
      {
        connectionId: connectionIdThree,
      } as RoomConnection,
      {
        connectionId: connectionIdFour,
      } as RoomConnection,
    ];

    // Action
    const connectionIds = getConnectionIdsFromConnections(roomConnections);

    // Assert
    expect(connectionIds).toBeDefined();
    expect(connectionIds).toHaveLength(4);
    expect(connectionIds[0]).toBe(connectionIdOne);
    expect(connectionIds[1]).toBe(connectionIdTwo);
    expect(connectionIds[2]).toBe(connectionIdThree);
    expect(connectionIds[3]).toBe(connectionIdFour);
  });
});

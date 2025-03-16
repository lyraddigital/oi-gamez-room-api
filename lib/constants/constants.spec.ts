import {
  EnvironmentVariables,
  EventTypes,
  HandlerFilePaths,
  HandlerFunctionNames,
  IndexNames,
  ResourcePaths,
} from "./constants";

describe("lambda constants tests", () => {
  it("all rest resource path constants are correct", () => {
    // Arrange / Action / Assert
    expect(ResourcePaths.gameTypes).toBe("game-types");
    expect(ResourcePaths.rooms).toBe("rooms");
    expect(ResourcePaths.room).toBe("{roomCode}");
    expect(ResourcePaths.public).toBe("public");
  });

  it("all handler file path constants are correct", () => {
    // Arrange / Action / Assert
    expect(HandlerFilePaths.getGameTypes).toBe(
      "../../../lambda/handlers/rest/get-game-types-handler/src/index.ts"
    );
    expect(HandlerFilePaths.createRoom).toBe(
      "../../../lambda/handlers/rest/create-room-handler/src/index.ts"
    );
    expect(HandlerFilePaths.expiredConnectionCleanup).toBe(
      "../../../lambda/handlers/cron/expired-connections-handler/src/index.ts"
    );
    expect(HandlerFilePaths.getRoomStatus).toBe(
      "../../../lambda/handlers/rest/get-room-status-handler/src/index.ts"
    );
    expect(HandlerFilePaths.joinRoom).toBe(
      "../../../lambda/handlers/rest/join-room-handler/src/index.ts"
    );
    expect(HandlerFilePaths.leaveRoom).toBe(
      "../../../lambda/handlers/rest/leave-room-handler/src/index.ts"
    );
    expect(HandlerFilePaths.ensureRoomConnection).toBe(
      "../../../lambda/handlers/websocket/ensure-room-connection-handler/src/index.ts"
    );
    expect(HandlerFilePaths.roomDeleteStream).toBe(
      "../../lambda/handlers/dynamo-db/room-deleted-handler/src/index.ts"
    );
    expect(HandlerFilePaths.roomDisconnection).toBe(
      "../../../lambda/handlers/websocket/room-disconnection-handler/src/index.ts"
    );
    expect(HandlerFilePaths.hostExpiredSubscriber).toBe(
      "../../../../lambda/handlers/subscribers/internal/host-expired-subscriber/src/index.ts"
    );
    expect(HandlerFilePaths.userExpiredSubscriber).toBe(
      "../../../../lambda/handlers/subscribers/internal/user-expired-subscriber/src/index.ts"
    );
    expect(HandlerFilePaths.roomRemovedSubscriber).toBe(
      "../../../../lambda/handlers/subscribers/internal/room-removed-subscriber/src/index.ts"
    );
    expect(HandlerFilePaths.userJoinedSubscriber).toBe(
      "../../../../lambda/handlers/subscribers/internal/user-joined-subscriber/src/index.ts"
    );
    expect(HandlerFilePaths.userLeftSubscriber).toBe(
      "../../../../lambda/handlers/subscribers/internal/user-left-subscriber/src/index.ts"
    );
    expect(HandlerFilePaths.hostChangedSubscriber).toBe(
      "../../../../lambda/handlers/subscribers/internal/host-changed-subscriber/src/index.ts"
    );
    expect(HandlerFilePaths.gameInitializedSubscriber).toBe(
      "../../../../lambda/handlers/subscribers/external/game-initialized-subscriber/src/index.ts"
    );
    expect(HandlerFilePaths.gameStartedSubscriber).toBe(
      "../../../../lambda/handlers/subscribers/external/game-started-subscriber/src/index.ts"
    );
    expect(HandlerFilePaths.gameCompletedSubscriber).toBe(
      "../../../../lambda/handlers/subscribers/external/game-completed-subscriber/src/index.ts"
    );
    expect(HandlerFilePaths.gameMessageSubscriber).toBe(
      "../../../../lambda/handlers/subscribers/external/game-message-subscriber/src/index.ts"
    );
    expect(HandlerFilePaths.getPublicRooms).toBe(
      "../../../lambda/handlers/rest/get-public-rooms-handler/src/index.ts"
    );
  });

  it("all handler function name constants are correct", () => {
    // Arrange / Action / Assert
    expect(HandlerFunctionNames.getGameTypes).toBe("handler");
    expect(HandlerFunctionNames.createRoom).toBe("handler");
    expect(HandlerFunctionNames.expiredConnectionCleanup).toBe("handler");
    expect(HandlerFunctionNames.getRoomStatus).toBe("handler");
    expect(HandlerFunctionNames.joinRoom).toBe("handler");
    expect(HandlerFunctionNames.leaveRoom).toBe("handler");
    expect(HandlerFunctionNames.ensureRoomConnection).toBe("handler");
    expect(HandlerFunctionNames.roomDeleteStream).toBe("handler");
    expect(HandlerFunctionNames.roomDisconnection).toBe("handler");
    expect(HandlerFunctionNames.hostExpiredSubscriber).toBe("handler");
    expect(HandlerFunctionNames.userExpiredSubscriber).toBe("handler");
    expect(HandlerFunctionNames.roomRemovedSubscriber).toBe("handler");
    expect(HandlerFunctionNames.userJoinedSubscriber).toBe("handler");
    expect(HandlerFunctionNames.userLeftSubscriber).toBe("handler");
    expect(HandlerFunctionNames.hostChangedSubscriber).toBe("handler");
    expect(HandlerFunctionNames.gameInitializedSubscriber).toBe("handler");
    expect(HandlerFunctionNames.gameStartedSubscriber).toBe("handler");
    expect(HandlerFunctionNames.gameCompletedSubscriber).toBe("handler");
    expect(HandlerFunctionNames.gameMessageSubscriber).toBe("handler");
    expect(HandlerFunctionNames.getPublicRooms).toBe("handler");
  });

  it("all index name constants are correct", () => {
    // Arrange / Action / Assert
    expect(IndexNames.hostedRooms).toBe("HostedRooms-index");
    expect(IndexNames.visibleRooms).toBe("VisibleRooms-index");
    expect(IndexNames.connection).toBe("Connection-index");
    expect(IndexNames.lastDisconnected).toBe("LastDisconnected-index");
  });

  it("all event type constants are correct", () => {
    // Arrange / Action / Assert
    expect(EventTypes.hostConnectionExpired).toBe(
      "room-internal.host-connection-expired"
    );
    expect(EventTypes.userConnectionExpired).toBe(
      "room-internal.user-connection-expired"
    );
    expect(EventTypes.roomRemoved).toBe("room-internal.room-removed");
    expect(EventTypes.userJoined).toBe("room-internal.user-joined");
    expect(EventTypes.userLeft).toBe("room-internal.user-left");
    expect(EventTypes.changeHost).toBe("room-internal.change-host");
    expect(EventTypes.gameInitialization).toBe("room-receive.game-initialized");
    expect(EventTypes.gameStarted).toBe("room-receive.game-started");
    expect(EventTypes.gameCompleted).toBe("room-receive.game-completed");
    expect(EventTypes.gameMessage).toBe("room-receive.game-message");
  });

  describe("environment variable constant tests", () => {
    it("all environment variable names correct for the get game types lambda", () => {
      // Arrange / Action / Assert
      expect(EnvironmentVariables.getGameTypes.tableName).toBe(
        "DYNAMO_TABLE_NAME"
      );
      expect(EnvironmentVariables.getGameTypes.corsAllowedOrigins).toBe(
        "CORS_ALLOWED_ORIGINS"
      );
    });

    it("all environment variable names correct for the create room lambda", () => {
      // Arrange / Action / Assert
      expect(EnvironmentVariables.createRoom.tableName).toBe(
        "DYNAMO_TABLE_NAME"
      );
      expect(EnvironmentVariables.createRoom.corsAllowedOrigins).toBe(
        "CORS_ALLOWED_ORIGINS"
      );
      expect(EnvironmentVariables.createRoom.connectWindowInSeconds).toBe(
        "CONNECT_WINDOW_IN_SECONDS"
      );
      expect(EnvironmentVariables.createRoom.hostRoomIndexName).toBe(
        "HOST_ROOM_INDEX_NAME"
      );
    });

    it("all environment variable names correct for the expired connections cleanup lambda", () => {
      // Arrange / Action / Assert
      expect(EnvironmentVariables.expiredConnectionCleanup.tableName).toBe(
        "DYNAMO_TABLE_NAME"
      );
      expect(EnvironmentVariables.expiredConnectionCleanup.eventBusName).toBe(
        "EB_INTERNAL_EB_NAME"
      );
      expect(
        EnvironmentVariables.expiredConnectionCleanup.eventBusEventSourceName
      ).toBe("EB_INTERNAL_EVENT_SOURCE_NAME");
      expect(
        EnvironmentVariables.expiredConnectionCleanup.connectionTableName
      ).toBe("CONNECTION_DYNAMO_TABLE_NAME");
      expect(
        EnvironmentVariables.expiredConnectionCleanup.lastDisconnectedIndexName
      ).toBe("CONNECTION_DYNAMO_LAST_DISCONNECTED_INDEX_NAME");
      expect(
        EnvironmentVariables.expiredConnectionCleanup
          .expiredDisconnectionWindowInSeconds
      ).toBe("EXPIRED_DISCONNECTION_WINDOW_IN_SECONDS");
    });

    it("all environment variable names correct for the get room status lambda", () => {
      // Arrange / Action / Assert
      expect(EnvironmentVariables.getRoomStatus.tableName).toBe(
        "DYNAMO_TABLE_NAME"
      );
      expect(EnvironmentVariables.getRoomStatus.corsAllowedOrigins).toBe(
        "CORS_ALLOWED_ORIGINS"
      );
    });

    it("all environment variable names correct for the join room lambda", () => {
      // Arrange / Action / Assert
      expect(EnvironmentVariables.joinRoom.tableName).toBe("DYNAMO_TABLE_NAME");
      expect(EnvironmentVariables.joinRoom.connectionTableName).toBe(
        "CONNECTION_DYNAMO_TABLE_NAME"
      );
      expect(EnvironmentVariables.joinRoom.corsAllowedOrigins).toBe(
        "CORS_ALLOWED_ORIGINS"
      );
    });

    it("all environment variable names correct for the leave room lambda", () => {
      // Arrange / Action / Assert
      expect(EnvironmentVariables.leaveRoom.tableName).toBe(
        "DYNAMO_TABLE_NAME"
      );
      expect(EnvironmentVariables.leaveRoom.connectionTableName).toBe(
        "CONNECTION_DYNAMO_TABLE_NAME"
      );
      expect(EnvironmentVariables.leaveRoom.corsAllowedOrigins).toBe(
        "CORS_ALLOWED_ORIGINS"
      );
      expect(EnvironmentVariables.leaveRoom.eventBusName).toBe(
        "EB_INTERNAL_EB_NAME"
      );
      expect(EnvironmentVariables.leaveRoom.eventBusEventSourceName).toBe(
        "EB_INTERNAL_EVENT_SOURCE_NAME"
      );
    });

    it("all environment variable names correct for the ensure room lambda", () => {
      // Arrange / Action / Assert
      expect(
        EnvironmentVariables.ensureRoomConnection.connectionTableName
      ).toBe("CONNECTION_DYNAMO_TABLE_NAME");
      expect(EnvironmentVariables.ensureRoomConnection.roomTableName).toBe(
        "DYNAMO_TABLE_NAME"
      );
      expect(
        EnvironmentVariables.ensureRoomConnection.updatedConnectionWindow
      ).toBe("UPDATED_CONNECT_WINDOW_IN_SECONDS");
      expect(EnvironmentVariables.ensureRoomConnection.eventBusName).toBe(
        "EB_INTERNAL_EB_NAME"
      );
      expect(
        EnvironmentVariables.ensureRoomConnection.eventBusEventSourceName
      ).toBe("EB_INTERNAL_EVENT_SOURCE_NAME");
      expect(
        EnvironmentVariables.ensureRoomConnection.externalEventBusName
      ).toBe("EB_EXTERNAL_EB_NAME");
      expect(
        EnvironmentVariables.ensureRoomConnection
          .externalEventBusEventSourceName
      ).toBe("EB_EXTERNAL_EVENT_SOURCE_NAME");
    });

    it("all environment variable names correct for the room delete stream lambda", () => {
      // Arrange / Action / Assert
      expect(EnvironmentVariables.roomDeleteStream.tableName).toBe(
        "DYNAMO_TABLE_NAME"
      );
    });

    it("all environment variable names correct for the room disconnection lambda", () => {
      // Arrange / Action / Assert
      expect(EnvironmentVariables.roomDisconnection.connectionTableName).toBe(
        "CONNECTION_DYNAMO_TABLE_NAME"
      );
      expect(EnvironmentVariables.roomDisconnection.connectionIndexName).toBe(
        "CONNECTION_DYNAMO_INDEX_NAME"
      );
    });

    it("all environment variable names correct for the host expiry subscription lambda", () => {
      // Arrange / Action / Assert
      expect(EnvironmentVariables.hostExpiredSubscriber.tableName).toBe(
        "DYNAMO_TABLE_NAME"
      );
      expect(
        EnvironmentVariables.hostExpiredSubscriber.connectionTableName
      ).toBe("CONNECTION_DYNAMO_TABLE_NAME");
      expect(EnvironmentVariables.hostExpiredSubscriber.eventBusName).toBe(
        "EB_INTERNAL_EB_NAME"
      );
      expect(
        EnvironmentVariables.hostExpiredSubscriber.eventBusEventSourceName
      ).toBe("EB_INTERNAL_EVENT_SOURCE_NAME");
    });

    it("all environment variable names correct for the user expiry subscription lambda", () => {
      // Arrange / Action / Assert
      expect(EnvironmentVariables.userExpiredSubscriber.tableName).toBe(
        "DYNAMO_TABLE_NAME"
      );
      expect(
        EnvironmentVariables.userExpiredSubscriber.connectionTableName
      ).toBe("CONNECTION_DYNAMO_TABLE_NAME");
      expect(EnvironmentVariables.userExpiredSubscriber.eventBusName).toBe(
        "EB_INTERNAL_EB_NAME"
      );
      expect(
        EnvironmentVariables.userExpiredSubscriber.eventBusEventSourceName
      ).toBe("EB_INTERNAL_EVENT_SOURCE_NAME");
    });

    it("all environment variable names correct for the room removed subscription lambda", () => {
      // Arrange / Action / Assert
      expect(
        EnvironmentVariables.roomRemovedSubscriber.connectionTableName
      ).toBe("CONNECTION_DYNAMO_TABLE_NAME");
      expect(
        EnvironmentVariables.roomRemovedSubscriber.roomSocketApiEndpoint
      ).toBe("ROOM_SOCKET_API_ENDPOINT");
      expect(
        EnvironmentVariables.roomRemovedSubscriber.externalEventBusName
      ).toBe("EB_EXTERNAL_EB_NAME");
      expect(
        EnvironmentVariables.roomRemovedSubscriber
          .externalEventBusEventSourceName
      ).toBe("EB_EXTERNAL_EVENT_SOURCE_NAME");
    });

    it("all environment variable names correct for the user joined subscription lambda", () => {
      // Arrange / Action / Assert
      expect(EnvironmentVariables.userJoinedSubscriber.tableName).toBe(
        "DYNAMO_TABLE_NAME"
      );
      expect(
        EnvironmentVariables.userJoinedSubscriber.connectionTableName
      ).toBe("CONNECTION_DYNAMO_TABLE_NAME");
      expect(
        EnvironmentVariables.userJoinedSubscriber.roomSocketApiEndpoint
      ).toBe("ROOM_SOCKET_API_ENDPOINT");
      expect(
        EnvironmentVariables.userJoinedSubscriber.externalEventBusName
      ).toBe("EB_EXTERNAL_EB_NAME");
      expect(
        EnvironmentVariables.userJoinedSubscriber
          .externalEventBusEventSourceName
      ).toBe("EB_EXTERNAL_EVENT_SOURCE_NAME");
    });

    it("all environment variable names correct for the user left subscription lambda", () => {
      // Arrange / Action / Assert
      expect(EnvironmentVariables.userLeftSubscriber.tableName).toBe(
        "DYNAMO_TABLE_NAME"
      );
      expect(EnvironmentVariables.userLeftSubscriber.connectionTableName).toBe(
        "CONNECTION_DYNAMO_TABLE_NAME"
      );
      expect(
        EnvironmentVariables.userLeftSubscriber.roomSocketApiEndpoint
      ).toBe("ROOM_SOCKET_API_ENDPOINT");
      expect(EnvironmentVariables.userLeftSubscriber.externalEventBusName).toBe(
        "EB_EXTERNAL_EB_NAME"
      );
      expect(
        EnvironmentVariables.userLeftSubscriber.externalEventBusEventSourceName
      ).toBe("EB_EXTERNAL_EVENT_SOURCE_NAME");
    });

    it("all environment variable names correct for the host changed subscription lambda", () => {
      // Arrange / Action / Assert
      expect(
        EnvironmentVariables.hostChangedSubscriber.connectionTableName
      ).toBe("CONNECTION_DYNAMO_TABLE_NAME");
      expect(
        EnvironmentVariables.hostChangedSubscriber.roomSocketApiEndpoint
      ).toBe("ROOM_SOCKET_API_ENDPOINT");
      expect(
        EnvironmentVariables.hostChangedSubscriber.externalEventBusName
      ).toBe("EB_EXTERNAL_EB_NAME");
      expect(
        EnvironmentVariables.hostChangedSubscriber
          .externalEventBusEventSourceName
      ).toBe("EB_EXTERNAL_EVENT_SOURCE_NAME");
    });

    it("all environment variable names correct for the game initialized subscription lambda", () => {
      // Arrange / Action / Assert
      expect(EnvironmentVariables.gameInitializedSubscriber.tableName).toBe(
        "DYNAMO_TABLE_NAME"
      );
      expect(
        EnvironmentVariables.gameInitializedSubscriber.connectionTableName
      ).toBe("CONNECTION_DYNAMO_TABLE_NAME");
      expect(
        EnvironmentVariables.gameInitializedSubscriber.roomSocketApiEndpoint
      ).toBe("ROOM_SOCKET_API_ENDPOINT");
    });

    it("all environment variable names correct for the game started subscription lambda", () => {
      // Arrange / Action / Assert
      expect(EnvironmentVariables.gameStartedSubscriber.tableName).toBe(
        "DYNAMO_TABLE_NAME"
      );
      expect(
        EnvironmentVariables.gameStartedSubscriber.connectionTableName
      ).toBe("CONNECTION_DYNAMO_TABLE_NAME");
      expect(
        EnvironmentVariables.gameStartedSubscriber.roomSocketApiEndpoint
      ).toBe("ROOM_SOCKET_API_ENDPOINT");
    });

    it("all environment variable names correct for the game completed subscription lambda", () => {
      // Arrange / Action / Assert
      expect(EnvironmentVariables.gameCompletedSubscriber.tableName).toBe(
        "DYNAMO_TABLE_NAME"
      );
      expect(
        EnvironmentVariables.gameCompletedSubscriber.connectionTableName
      ).toBe("CONNECTION_DYNAMO_TABLE_NAME");
      expect(
        EnvironmentVariables.gameCompletedSubscriber.roomSocketApiEndpoint
      ).toBe("ROOM_SOCKET_API_ENDPOINT");
    });

    it("all environment variable names correct for the game message subscription lambda", () => {
      // Arrange / Action / Assert
      expect(EnvironmentVariables.gameMessageSubscriber.tableName).toBe(
        "DYNAMO_TABLE_NAME"
      );
      expect(
        EnvironmentVariables.gameMessageSubscriber.connectionTableName
      ).toBe("CONNECTION_DYNAMO_TABLE_NAME");
      expect(
        EnvironmentVariables.gameMessageSubscriber.roomSocketApiEndpoint
      ).toBe("ROOM_SOCKET_API_ENDPOINT");
    });

    it("all environment variable names correct for the game message subscription lambda", () => {
      // Arrange / Action / Assert
      expect(EnvironmentVariables.getPublicRooms.tableName).toBe(
        "DYNAMO_TABLE_NAME"
      );
      expect(EnvironmentVariables.getPublicRooms.visibleRoomsIndexName).toBe(
        "VISIBLE_ROOM_INDEX_NAME"
      );
      expect(EnvironmentVariables.getPublicRooms.corsAllowedOrigins).toBe(
        "CORS_ALLOWED_ORIGINS"
      );
      expect(EnvironmentVariables.getPublicRooms.publicRoomsToRetrieve).toBe(
        "PUBLIC_ROOMS_TO_RETRIEVE"
      );
    });
  });
});

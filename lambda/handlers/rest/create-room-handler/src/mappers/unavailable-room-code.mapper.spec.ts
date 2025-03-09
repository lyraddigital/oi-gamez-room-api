import { AttributeValue } from "@aws-sdk/client-dynamodb";
import { mapFromDynamoToUnavailableRoomCode } from "./unavailable-room-code.mapper";

describe("mapFromDynamoToUnavailableRoomCode tests", () => {
  it("returns the correct something", () => {
    // Arrange
    const unavCode = "AB";
    const record: Record<string, AttributeValue> = {
      SK: { S: `#${unavCode}` },
    };

    // Action
    const unavailableRoomCode = mapFromDynamoToUnavailableRoomCode(record);

    // Assert
    expect(unavailableRoomCode).toBe(unavCode);
  });
});

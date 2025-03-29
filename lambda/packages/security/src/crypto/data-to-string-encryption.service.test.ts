import { createDecipheriv } from "crypto";

import { encryptCustomDataToString } from "./data-to-string-encryption.service";

describe("encryptCustomDataToString tests", () => {
  test("encrypts the data successfully", async () => {
    // Arrange
    const encryptionKey = "jdcjvetiguitfdfdsfercdupzivrttfx"; // Must be 32 characters
    const encryptionIV = "SomeEncryptionIV";
    const payload = {
      roomCode: "ABCD",
      username: "daryl_duck",
    };

    // Action
    const encryptedValue = encryptCustomDataToString(
      encryptionKey,
      encryptionIV,
      payload
    );

    // Assert
    const decipher = createDecipheriv(
      "aes-256-cbc",
      encryptionKey,
      encryptionIV
    );
    let decryptedValue = decipher.update(encryptedValue, "base64", "utf-8");
    decryptedValue += decipher.final("utf-8");

    const decryptedObject = JSON.parse(decryptedValue) as {
      roomCode: string;
      username: string;
    };

    expect(decryptedObject).toEqual(payload);
  });
});

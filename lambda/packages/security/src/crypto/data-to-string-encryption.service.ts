import { createCipheriv } from "crypto";

export const encryptCustomDataToString = <T extends object>(
  key: string,
  iv: string,
  data: T
): string => {
  const json = JSON.stringify(data);
  const cipher = createCipheriv("aes-256-cbc", key, iv);

  let encrypted = cipher.update(json, "utf8", "base64");
  encrypted += cipher.final("base64");

  return encrypted;
};

import { AttributeValue } from "@aws-sdk/client-dynamodb";
import { writeFileSync } from "fs";
import { join } from "path";

const generateSeedFilename = () => {
  const nowTime = new Date();
  const currentUtcDateString = `${nowTime.getUTCFullYear()}${
    nowTime.getUTCMonth() < 10
      ? `0${nowTime.getUTCMonth()}`
      : nowTime.getUTCMonth()
  }${
    nowTime.getUTCDate() < 10
      ? `0${nowTime.getUTCDate()}`
      : nowTime.getUTCDate()
  }${
    nowTime.getUTCHours() < 10
      ? `0${nowTime.getUTCHours()}`
      : nowTime.getUTCHours()
  }${
    nowTime.getUTCMinutes() < 10
      ? `0${nowTime.getUTCMinutes()}`
      : nowTime.getUTCMinutes()
  }${
    nowTime.getUTCSeconds() < 10
      ? `0${nowTime.getUTCSeconds()}`
      : nowTime.getUTCSeconds()
  }${
    nowTime.getUTCMilliseconds() < 10
      ? `00${nowTime.getUTCMilliseconds()}`
      : nowTime.getUTCMilliseconds() < 100
      ? `0${nowTime.getUTCMilliseconds()}`
      : nowTime.getUTCMilliseconds()
  }`;

  return `init_seed_${currentUtcDateString}.json`;
};

const getAvailableCodesAsDynamoRecords = (): Record<
  string,
  AttributeValue
>[] => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const allAvailableCodes: Record<string, AttributeValue>[] = [];

  [...characters].forEach((c) => {
    [...characters].forEach((c2) => {
      const subCodes: string[] = [];

      [...characters].forEach((c3) => {
        [...characters].forEach((c4) => {
          subCodes.push(`${c3}${c4}`);
        });
      });

      allAvailableCodes.push({
        PK: { S: `AvailableDivisionCode#${c}` },
        SK: { S: `#GroupCode#${c2}` },
        Subcodes: { SS: subCodes },
      });
    });
  });

  return allAvailableCodes;
};

(() => {
  const jsonFilename = generateSeedFilename();
  const availableCodesToSave = getAvailableCodesAsDynamoRecords();

  writeFileSync(
    join(__dirname, "/scripts", jsonFilename),
    JSON.stringify(availableCodesToSave)
  );
})();

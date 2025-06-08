import {
  AttributeValue,
  BatchWriteItemCommand,
  DynamoDBClient,
  QueryCommand,
} from "@aws-sdk/client-dynamodb";

import {
  S3Client,
  ListObjectsV2Command,
  NoSuchBucket,
  S3ServiceException,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

const s3Client = new S3Client();
const dbClient = new DynamoDBClient();

const getMigrationScriptsFromS3 = async (): Promise<
  { fileName: string; dateCreated: Date }[]
> => {
  const command = new ListObjectsV2Command({
    Bucket: "oigamez-room-api-migration-scripts",
  });

  try {
    const response = await s3Client.send(command);
    const migrationFiles = response?.Contents || [];

    return migrationFiles
      .filter(
        (o) => o?.Key?.endsWith(".json") && hasValidDateInFilename(o?.Key)
      )
      .map((o) => ({
        fileName: o.Key!,
        dateCreated: getDateCreated(o.Key)!,
      }));
  } catch (ex: any) {
    if ((ex as S3ServiceException).name === "NoSuchBucket") {
      console.log("No such bucket error", (ex as NoSuchBucket).message);
    } else {
      console.error("Some other error", ex);
    }

    return [];
  }
};

const getMigrationScriptsRan = async (): Promise<{ fileName: string }[]> => {
  const query = new QueryCommand({
    TableName:
      "OiGamezRoomApiStack-RoomTableOIGamezRoomData541BF7C5-11ZQDXQ1PGX0P",
    KeyConditionExpression: "#pk = :pk",
    ExpressionAttributeNames: {
      "#pk": "PK",
    },
    ExpressionAttributeValues: {
      ":pk": { S: "MigrationScripts" },
    },
  });

  const response = await dbClient.send(query);

  return (
    response.Items?.filter((i) => !!i["FileName"]?.S).map((i) => ({
      fileName: i["FileName"].S!,
    })) || []
  );
};

const getDatePartString = (
  objectKey: string | undefined
): string | undefined => {
  const keyParts = objectKey?.replace(".json", "")?.split("_") || [];

  if (keyParts.length === 0) {
    return undefined;
  }

  return keyParts[keyParts.length - 1];
};

const getDateCreated = (objectKey: string | undefined): Date | undefined => {
  const datePart = getDatePartString(objectKey);

  if (!datePart) {
    return undefined;
  }

  const year = parseInt(datePart.substring(0, 4), 10);
  const month = parseInt(datePart.substring(4, 6), 10);
  const day = parseInt(datePart.substring(6, 8), 10);
  const hours = parseInt(datePart.substring(8, 10), 10);
  const minutes = parseInt(datePart.substring(10, 12), 10);
  const seconds = parseInt(datePart.substring(12, 14), 10);
  const milliseconds = parseInt(datePart.substring(14), 10);

  return new Date(
    Date.UTC(year, month - 1, day, hours, minutes, seconds, milliseconds)
  );
};

const hasValidDateInFilename = (objectKey: string | undefined): boolean => {
  const datePart = getDatePartString(objectKey);

  if (!datePart) {
    return false;
  }

  const dateRegEx = /^[0-9]{17}$/;

  if (!dateRegEx.test(datePart)) {
    return false;
  }

  return !!getDateCreated(objectKey);
};

const executeBatch = async (
  records: Record<string, AttributeValue>[]
): Promise<void> => {
  const numberOfBatchWrites = Math.ceil(records.length / 25);

  for (let i = 0; i < numberOfBatchWrites; i++) {
    const startIndex = i * 25;
    const endIndex = startIndex + 25;
    const batchItems = records.slice(startIndex, endIndex);
    const batchWriteItemsCommand = new BatchWriteItemCommand({
      RequestItems: {
        ["OiGamezRoomApiStack-RoomTableOIGamezRoomData541BF7C5-11ZQDXQ1PGX0P"]:
          batchItems.map((r) => ({
            PutRequest: {
              Item: r,
            },
          })),
      },
    });

    await dbClient.send(batchWriteItemsCommand);
  }
};

const runMigrationScripts = async (fileNames: string[]): Promise<void> => {
  fileNames.forEach(async (fileName: string) => {
    const getJsonFileCommand = new GetObjectCommand({
      Bucket: "oigamez-room-api-migration-scripts",
      Key: fileName,
    });
    const response = await s3Client.send(getJsonFileCommand);
    const json = (await response.Body?.transformToString()) || "";
    const records = JSON.parse(json) as Record<string, AttributeValue>[];

    await executeBatch(records);
  });
};

(async () => {
  const dynamoMigrationScripts = await getMigrationScriptsRan();
  const s3MigrationScripts = await getMigrationScriptsFromS3();
  const scriptsToRun = s3MigrationScripts.filter(
    (sms) =>
      !dynamoMigrationScripts.find((dms) => dms.fileName === sms.fileName)
  );
  scriptsToRun.sort((lScr, rScr) =>
    lScr.dateCreated > rScr.dateCreated ? 1 : -1
  );

  await runMigrationScripts(scriptsToRun.map((str) => str.fileName));
})();

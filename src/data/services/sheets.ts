import { google } from "googleapis";
import envVars from "../../config/envVars";
import { Worksheet } from "../../generatedTypes";
import logger from "../../util/logger";

const CLIENT_EMAIL = envVars().CLIENT_EMAIL;
const PRIVATE_KEY = envVars().PRIVATE_KEY;
const scopes = [
  "https://www.googleapis.com/auth/spreadsheets.readonly",
  "https://www.googleapis.com/auth/drive.readonly"
];
const auth = new google.auth.JWT(CLIENT_EMAIL, null, PRIVATE_KEY, scopes, null);
google.options({
  timeout: 1000,
  auth
});

export const lastModifiedDate = async (spreadsheetId: string) => {
  const drive = google.drive("v3");
  const { data } = await drive.files.get({
    fileId: spreadsheetId,
    fields: "modifiedTime"
  });
  return data.modifiedTime;
};

export const worksheets = async (
  spreadsheetId: string
): Promise<Array<Worksheet>> => {
  const sheets = google.sheets("v4");
  const { data } = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: "sheets/properties"
  });
  const response = data.sheets.map(sheet => {
    const {
      index,
      gridProperties,
      sheetId,
      title,
      sheetType
    } = sheet.properties;
    return {
      title,
      index,
      sheetId,
      sheetType,
      rowCount: gridProperties.rowCount,
      columnCount: gridProperties.columnCount
    };
  });
  return response;
};

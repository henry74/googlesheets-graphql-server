import { google } from "googleapis";
import envVars from "../../config/envVars";
import { Worksheet, Table } from "../../generatedTypes";
import * as zipObject from "lodash.zipobject";
import { ApolloError } from "apollo-server-core";
import logger from "../../util/logger";

const CLIENT_EMAIL = envVars().CLIENT_EMAIL;
const PRIVATE_KEY = envVars().PRIVATE_KEY;
const scopes = [
  "https://www.googleapis.com/auth/spreadsheets.readonly",
  "https://www.googleapis.com/auth/drive.readonly"
];
const auth = new google.auth.JWT(CLIENT_EMAIL, null, PRIVATE_KEY, scopes, null);
google.options({
  timeout: 5000,
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
  try {
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
  } catch (err) {
    throw new ApolloError(err);
  }
};

export const table = async (
  spreadsheetId: string,
  worksheetTitle: string,
  rangeHeaders: boolean = true,
  worksheetRange?: string
): Promise<Table> => {
  const ranges = [
    `'${worksheetTitle}'${worksheetRange ? `!${worksheetRange}` : ""}`
  ];

  const sheets = google.sheets("v4");
  const { data } = await sheets.spreadsheets.get({
    spreadsheetId,
    ranges,
    fields:
      "properties.title,sheets.properties,sheets.data(rowData.values.effectiveValue,rowData.values.formattedValue,rowData.values.effectiveFormat.numberFormat)",
    includeGridData: true
  });
  return sheetToTable(data.sheets[0], rangeHeaders);
};

function sheetToTable(sheet, hasHeaders: boolean): Table {
  if (sheet.data.length === 0 || sheet.data[0].rowData === undefined) {
    return {
      worksheetTitle: sheet.properties.title,
      headers: [],
      formats: [],
      rows: []
    };
  }
  const gridData = sheet.data[0]; // first (unique) range
  const headers = hasHeaders
    ? gridData.rowData[0].values // first row (headers)
        .map(col => formattedValue(col))
    : gridData.rowData[0].values.map((_, i) => `Column${i + 1}`);

  const otherRows = hasHeaders ? gridData.rowData.slice(1) : gridData.rowData;

  const values =
    otherRows.length > 0
      ? otherRows[0].values
      : new Array(headers.length).fill({});

  return {
    worksheetTitle: sheet.properties.title,
    headers: headers,
    formats: values.map(value => effectiveFormat(value)),
    rows: otherRows.map(row =>
      zipObject(
        headers,
        row.values.map(value => ({
          value: effectiveValue(value),
          stringValue: formattedValue(value)
        }))
      )
    )
  };
}

function formattedValue(value) {
  return value ? value.formattedValue : value;
}

function effectiveValue(value) {
  if (!value) return value;

  if (value.effectiveFormat === null || value.effectiveFormat === undefined) {
    return value.formattedValue;
  }

  if (value.effectiveFormat.numberFormat) {
    switch (value.effectiveFormat.numberFormat.type) {
      case "TEXT":
        return value.effectiveValue && value.effectiveValue.stringValue
          ? value.effectiveValue.stringValue
          : "";
      case "NUMBER":
        return value.effectiveValue && value.effectiveValue.numberValue
          ? value.effectiveValue.numberValue
          : 0;
      case "CURRENCY":
        return value.effectiveValue && value.effectiveValue.numberValue
          ? value.effectiveValue.numberValue
          : 0;
      case "DATE": // 'serial number' format
        return value.effectiveValue && value.effectiveValue.numberValue
          ? ExcelDateToJSDate(value.effectiveValue.numberValue)
          : new Date();
    }
  }

  return value.formattedValue;
}

function effectiveFormat(value) {
  if (value.effectiveFormat) {
    return value.effectiveFormat;
  }
  return { numberFormat: { type: "NONE" } };
}

/**
 * Converting Excel Date Serial Number to Date using Javascript
 * Source: http://stackoverflow.com/a/16233621/336596
 * @param {[type]} serial a date value in "Excel Date Serial" format
 */
function ExcelDateToJSDate(serial) {
  const utc_days = Math.floor(serial - 25569);
  const utc_value = utc_days * 86400;
  const date_info = new Date(utc_value * 1000);

  const fractional_day = serial - Math.floor(serial) + 0.0000001;

  let total_seconds = Math.floor(86400 * fractional_day);

  const seconds = total_seconds % 60;

  total_seconds -= seconds;

  const hours = Math.floor(total_seconds / (60 * 60));
  const minutes = Math.floor(total_seconds / 60) % 60;

  return new Date(
    date_info.getFullYear(),
    date_info.getMonth(),
    date_info.getDate(),
    hours,
    minutes,
    seconds
  );
}

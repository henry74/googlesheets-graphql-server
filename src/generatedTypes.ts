export type Maybe<T> = T | null;

export enum NumberFormatType {
  Text = "TEXT",
  Number = "NUMBER",
  Currency = "CURRENCY",
  Date = "DATE"
}

/** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
export type JsonObject = any;

/** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
export type Json = any;

// ====================================================
// Scalars
// ====================================================

// ====================================================
// Types
// ====================================================

export interface Query {
  unused?: Maybe<string>;

  lastModifiedDate: string;

  spreadsheet: Spreadsheet;

  fetchTable: Table;
}

export interface Spreadsheet {
  spreadsheetId: string;

  lastModifiedDate: string;

  worksheets: Worksheet[];
}

export interface Worksheet {
  sheetId?: Maybe<number>;

  title?: Maybe<string>;

  index?: Maybe<number>;

  sheetType?: Maybe<string>;

  rowCount?: Maybe<number>;

  columnCount?: Maybe<number>;
}

export interface Table {
  worksheetTitle?: Maybe<string>;

  headers?: Maybe<(Maybe<string>)[]>;

  formats?: Maybe<(Maybe<NumberFormat>)[]>;

  rows?: Maybe<(Maybe<JsonObject>)[]>;
}

export interface NumberFormat {
  type: NumberFormatType;

  pattern?: Maybe<string>;
}

export interface Mutation {
  unused?: Maybe<string>;

  addBooks?: Maybe<string>;
}

export interface Subscription {
  unused?: Maybe<string>;
}

// ====================================================
// Arguments
// ====================================================

export interface LastModifiedDateQueryArgs {
  spreadsheetId: string;
}
export interface SpreadsheetQueryArgs {
  spreadsheetId: string;
}
export interface FetchTableQueryArgs {
  spreadsheetId: string;

  worksheetTitle: string;

  rangeHeaders: boolean;

  worksheetRange?: Maybe<string>;
}
export interface AddBooksMutationArgs {
  title: string;
}

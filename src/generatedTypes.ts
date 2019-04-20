export type Maybe<T> = T | null;

// ====================================================
// Types
// ====================================================

export interface Query {
  unused?: Maybe<string>;

  lastModifiedDate: string;

  spreadsheet: Spreadsheet;
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

  lastModifiedDate?: Maybe<string>;
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
export interface AddBooksMutationArgs {
  title: string;
}

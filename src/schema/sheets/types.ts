import { gql } from "apollo-server-express";

export const typeDef = gql`
  type Worksheet {
    sheetId: Int
    title: String
    index: Int
    sheetType: String
    rowCount: Int
    columnCount: Int
    lastModifiedDate: String
  }

  type Spreadsheet {
    spreadsheetId: String!
    lastModifiedDate: String!
    worksheets: [Worksheet!]!
  }
`;

export const resolvers = {
  Spreadsheet: {
    lastModifiedDate: (root, _, { services: { sheets } }) => {
      return sheets.lastModifiedDate(root.spreadsheetId);
    },
    worksheets: (root, _, { services: { sheets } }) => {
      return sheets.worksheets(root.spreadsheetId);
    }
  }
};

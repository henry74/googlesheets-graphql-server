import { gql } from "apollo-server-express";

export const typeDef = gql`
  extend type Query {
    lastModifiedDate(spreadsheetId: String!): String!
    spreadsheet(spreadsheetId: String!): Spreadsheet!
    fetchTable(
      spreadsheetId: String!
      worksheetTitle: String!
      rangeHeaders: Boolean!
      worksheetRange: String
    ): Table!
  }
`;

export const resolvers = {
  Query: {
    lastModifiedDate: (root, { spreadsheetId }, { services: { sheets } }) => {
      return sheets.lastModifiedDate(spreadsheetId);
    },
    spreadsheet: (root, { spreadsheetId }, { services: { sheets } }) => {
      return { spreadsheetId };
    },
    fetchTable: (
      root,
      { spreadsheetId, worksheetTitle, rangeHeaders, worksheetRange },
      { services: { sheets } }
    ) => {
      return sheets.table(
        spreadsheetId,
        worksheetTitle,
        rangeHeaders,
        worksheetRange
      );
    }
  }
};

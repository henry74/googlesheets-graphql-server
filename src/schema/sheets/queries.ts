import { gql } from "apollo-server-express";

export const typeDef = gql`
  extend type Query {
    lastModifiedDate(spreadsheetId: String!): String!
    spreadsheet(spreadsheetId: String!): Spreadsheet!
  }
`;

export const resolvers = {
  Query: {
    lastModifiedDate: (root, { spreadsheetId }, { services: { sheets } }) => {
      return sheets.lastModifiedDate(spreadsheetId);
    },
    spreadsheet: (root, { spreadsheetId }, { services: { sheets } }) => {
      return { spreadsheetId };
    }
  }
};

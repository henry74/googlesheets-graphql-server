import { gql } from "apollo-server-express";

export const typeDef = gql`
  # Mutations
  extend type Mutation {
    setOAuthCode(code: String!): JSONObject
  }
`;

export const resolvers = {
  Mutation: {
    setOAuthCode: async (root, { code }, { services: { sheets } }) => {
      return sheets.setOAuthCode(code);
    }
  }
};

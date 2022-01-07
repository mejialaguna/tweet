const { gql } = require("graphql-tag");

const typeDefs = gql`
  type Query {
    sayHi: String!
  }
`;

module.exports = typeDefs;

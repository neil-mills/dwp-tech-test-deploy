"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = apollo_server_express_1.gql `
  type Query {
    londonUsers: [User]!
  }

  type User {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    ip_address: String!
    latitude: Float!
    longitude: Float!
    distance: Float!
    livesInLondon: Boolean!
  }
`;

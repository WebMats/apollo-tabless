const { gql } = require('apollo-server')

const typeDefs = gql`
    type Tab {
        tabId: ID!
        tabUrl: String!
        importance: String
        category: String
        creator: User
    }
    type User {
        userId: ID!
        username: String!
        email: String!
        phone: String!
    }
    type UserCredentials {
        user: User!
        token: String!
        expiresIn:  Int!
    }
    input CreateTabInput {
        tabUrl: String!
        importance: String
        category: String
    }
    type Query {
        tabs: [Tab!]!
    }
    type Mutation {
        login(inputUsername: String!, inputPassword: String!, email: String, phone: String): UserCredentials!
        createTab(createTabInput: CreateTabInput!): Tab
        deleteTab(tabId: ID!): ID!
        updateTab: Tab!
    }
`;

module.exports = typeDefs;
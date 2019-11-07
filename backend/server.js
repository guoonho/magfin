const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
require('./src/config.js');
const { Card, CardList } = require('./src/models.js');

const typeDefs = gql`
    type Card {
        name: String!
        edition: String!
        listId: String
    }
    type CardList {
        _id: String
        name: String
    }
    type Query {
        "A simple type"
        cards(listId: String!): [Card]
        allCards: [Card]
        cardLists: [CardList]
    }
    type Mutation {
        cards(name: String!, edition: String!, listId: String!): Card
        cardLists(name: String!): CardList 
        deleteAllCards: Int
        deleteAllCardLists: Int
    }
`;

const resolvers = {
    Query: {
        allCards: async () => {
            let response = await Card.find({}).exec()
            return response
        },
        cards(obj, args, context, info) {
            let response = Card.find({
                listId: args.listId
            })
            .exec()
            return response
        },
        cardLists: async () => {
            let response = await CardList.find({}).exec()
            return response
        }
    },

    Mutation: {
        cards: async (_, args) => {
            try {
                let response = await Card.create(args);
                return response;
            } catch(e) {
                return e.message;
            }
        },
        cardLists: async(_, args) => {
            try {
                let response;
                var cardlist = new CardList(args);
                response = cardlist.save();
                return response;
            } catch(e) {
                return e.message;
            }
        },
        deleteAllCards: async () => {
            try {
                let response = await Card.remove({}).exec()
                return response.deletedCount
            } catch(e) {
                return e.message;
            }
        },
        deleteAllCardLists: async () => {
            try {
                let response = await CardList.remove({}).exec()
                return response.deletedCount
            } catch(e) {
                return e.message;
            }
        }
    }
};

const app = express();
const server = new ApolloServer({ 
    typeDefs, 
    resolvers 
});
server.applyMiddleware({
    app,
    cors: {
        origin: '*',
        credentials: true
    }
});
app.listen({ port: 8080 }, () =>
  console.log(`🚀 Server ready at http://localhost:8080${server.graphqlPath}`)
);

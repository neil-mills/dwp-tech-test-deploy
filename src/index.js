"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import dotenv from 'dotenv';
// dotenv.config();
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const resolvers_1 = require("./lib/resolvers");
const typeDefs_1 = require("./lib/typeDefs");
const port = process.env.port || 9000;
const app = express_1.default();
const mount = (app) => {
    app.use(express_1.default.static(`${__dirname}/client`));
    app.get('/', (req, res) => res.sendFile(`${__dirname}/client/index.html`));
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs: typeDefs_1.typeDefs,
        resolvers: resolvers_1.resolvers,
    });
    server.applyMiddleware({ app, path: '/api' }); //graphql api url
    app.listen(port);
    console.log(`Server is running on port ${port}`);
};
mount(express_1.default());

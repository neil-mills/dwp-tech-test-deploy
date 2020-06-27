"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const resolvers_1 = require("./lib/resolvers");
const typeDefs_1 = require("./lib/typeDefs");
const logger_1 = __importDefault(require("./lib/logger"));
const port = process.env.PORT || 9000;
const mount = (app) => {
    app.use(express_1.default.static(`${__dirname}/client`));
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs: typeDefs_1.typeDefs,
        resolvers: resolvers_1.resolvers,
    });
    server.applyMiddleware({ app, path: '/api' });
    app.listen(port, () => logger_1.default.info(`Server is running on port ${port}`));
    app.get('/', (_req, res) => {
        const options = {
            root: `${__dirname}/client/`,
        };
        res.sendFile(`index.html`, options, (err) => {
            if (err) {
                logger_1.default.info(err.message);
            }
        });
    });
};
mount(express_1.default());

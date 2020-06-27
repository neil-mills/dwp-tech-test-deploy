"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const geolib_1 = require("geolib");
const axios_1 = __importDefault(require("axios"));
const logger_1 = __importDefault(require("./logger"));
const baseUrl = 'https://bpdts-test-app.herokuapp.com';
const london = {
    latitude: 51.50853,
    longitude: -0.12574,
};
const maxDistance = 50;
const getDistanceFromLondon = (latitude, longitude) => {
    const metres = geolib_1.getDistance(Object.assign({}, london), { latitude, longitude });
    return metres / 1609.34;
};
exports.resolvers = {
    Query: {
        londonUsers: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const [livingInLondonUsers, allUsers] = yield Promise.all([
                    axios_1.default.get(`${baseUrl}/city/London/users`),
                    axios_1.default.get(`${baseUrl}/users`),
                ]);
                const currentlyNearLondonUsers = allUsers.data
                    .reduce((res, user) => {
                    const latitude = parseFloat(user.latitude.toString());
                    const longitude = parseFloat(user.longitude.toString());
                    const distance = getDistanceFromLondon(latitude, longitude);
                    if (distance <= maxDistance)
                        res = [...res, Object.assign(Object.assign({}, user), { distance })];
                    return res;
                }, [])
                    .sort((a, b) => a.distance - b.distance);
                const users = [
                    ...livingInLondonUsers.data
                        .filter((user) => !currentlyNearLondonUsers
                        .map(({ email }) => email)
                        .includes(user.email))
                        .map((user) => (Object.assign(Object.assign({}, user), { distance: getDistanceFromLondon(user.latitude, user.longitude), livesInLondon: true }))),
                    ...currentlyNearLondonUsers
                        .filter((user) => !livingInLondonUsers.data
                        .map(({ email }) => email)
                        .includes(user.email))
                        .map((user) => (Object.assign(Object.assign({}, user), { livesInLondon: false }))),
                ];
                return users;
            }
            catch (error) {
                logger_1.default.info(error.message, error);
                throw new Error(error);
            }
        }),
    },
    User: {
        latitude: (user) => parseFloat(user.latitude.toString()),
        longitude: (user) => parseFloat(user.longitude.toString()),
    },
};

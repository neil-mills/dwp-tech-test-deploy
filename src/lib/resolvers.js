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
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const { getDistance } = require('geolib');
const axios = require('axios');
const baseUrl = 'https://bpdts-test-app.herokuapp.com';
const london = {
    latitude: 51.50853,
    longitude: -0.12574,
};
const maxDistance = 50;
const getDistanceFromLondon = (latitude, longitude) => {
    const metres = getDistance(Object.assign({}, london), { latitude, longitude });
    return metres / 1609.34;
};
exports.resolvers = {
    Query: {
        londonUsers: () => __awaiter(void 0, void 0, void 0, function* () {
            // throw new Error('test error!!')
            try {
                const [livingInLondonUsers, allUsers] = yield Promise.all([
                    axios.get(`${baseUrl}/city/London/users`),
                    axios.get(`${baseUrl}/users`),
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
                throw new Error(error);
            }
        }),
    },
    User: {
        latitude: (user) => parseFloat(user.latitude.toString()),
        longitude: (user) => parseFloat(user.longitude.toString()),
    },
};

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { readFileSync, writeFileSync } from "fs";
const axios_1 = __importDefault(require("axios"));
const common_1 = require("@nestjs/common");
const httpClient = axios_1.default.create({
    baseURL: process.env.UNTAPPD_API_BASE_URL,
    params: {
        client_id: process.env.UNTAPPD_API_CLIENT_ID,
        client_secret: process.env.UNTAPPD_API_CLIENT_SECRET,
    },
    headers: {
        Accept: "application/json",
        "User-Agent": `mcgrewgs's App (${process.env.UNTAPPD_API_CLIENT_ID})`,
    },
});
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
const logger = new common_1.Logger("UntappdClient", true);
function UntappdGet(path, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        const sleepTimeMillis = Number.parseInt(process.env.UNTAPPD_API_WAIT_TIME_MILLIS);
        logger.debug(`Sleeping ${sleepTimeMillis} ms`);
        yield delay(sleepTimeMillis);
        logger.debug(`Calling ${path}`);
        return httpClient.get(path).then((resp) => {
            return callback(resp);
        });
    });
}
exports.UntappdGet = UntappdGet;
function GetUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield UntappdGet(`/user/info/${username}`, (resp) => {
            return resp.data.response
                .user;
        });
    });
}
exports.GetUser = GetUser;
function GetUserTotalBeers(username) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield GetUser(username)).stats.total_beers;
    });
}
exports.GetUserTotalBeers = GetUserTotalBeers;
function GetUserTopBeersPaginated(username) {
    return __awaiter(this, void 0, void 0, function* () {
        let offset = 0;
        let partial = [];
        let resp = undefined;
        while (offset !== undefined) {
            resp = yield UntappdGet(`/user/beers/${username}?limit=50&offset=${offset}&sort=highest_rated_you`, (resp) => {
                return resp.data;
            });
            offset = resp.response.pagination.offset;
            partial = [...partial, ...resp.response.beers.items];
        }
        return partial;
    });
}
exports.GetUserTopBeersPaginated = GetUserTopBeersPaginated;
function GetUserTopBeers(username) {
    return UntappdGet(`/user/beers/${username}?limit=50&offset=0&sort=highest_rated_you`, (resp) => {
        return resp.data.response
            .beers.items;
    });
}
exports.GetUserTopBeers = GetUserTopBeers;
function GetBeerInfo(beerId) {
    return UntappdGet(`/beer/info/${beerId}`, (resp) => {
        return resp.data.response
            .beer;
    });
}
exports.GetBeerInfo = GetBeerInfo;
function GetBeerCheckins(beerId) {
    return UntappdGet(`/beer/checkins/${beerId}?limit=50`, (resp) => {
        return resp.data
            .response;
    });
}
exports.GetBeerCheckins = GetBeerCheckins;
function GetFriends(username) {
    return UntappdGet(`/user/friends/${username}?limit=25`, (resp) => {
        return resp.data.response.items.map((it) => it.user);
    });
}
exports.GetFriends = GetFriends;

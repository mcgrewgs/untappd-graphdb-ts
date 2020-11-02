// import { readFileSync, writeFileSync } from "fs";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import {
    ResponseUser,
    UntappdUserResponseWithMetadata,
} from "../model/UntappdUserResponseModel";
import {
    UntappdBeersResponseWithMetadata,
    BeerWithRating,
    Beer,
} from "../model/UntappdBeersResponseModel";
import {
    UntappdBeerInfoResponseWithMetadata,
    ResponseBeer,
} from "../model/UntappdBeerInfoResponseModel";
import {
    UntappdBeerCheckinsResponseWithMetadata,
    UntappdBeerCheckinsResponse,
} from "../model/UntappdBeerCheckinsResponseModel";
import {
    UntappdUserFriendsResponseWithMetadata,
    User,
} from "../model/UntappdUserFriendsResponseModel";
import { Logger } from "@nestjs/common";

const httpClient: AxiosInstance = axios.create({
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

function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const logger = new Logger("UntappdClient", true);

export async function UntappdGet<T>(
    path: string,
    callback: (r: AxiosResponse<any>) => T
): Promise<T> {
    const sleepTimeMillis = Number.parseInt(
        process.env.UNTAPPD_API_WAIT_TIME_MILLIS
    );
    logger.debug(`Sleeping ${sleepTimeMillis} ms`);
    await delay(sleepTimeMillis);
    logger.debug(`Calling ${path}`);
    return httpClient.get(path).then((resp) => {
        return callback(resp);
    });
}

export async function GetUser(username: string): Promise<ResponseUser> {
    return await UntappdGet<ResponseUser>(`/user/info/${username}`, (resp) => {
        return (resp.data as UntappdUserResponseWithMetadata).response
            .user as ResponseUser;
    });
}

export async function GetUserTotalBeers(username: string): Promise<number> {
    return (await GetUser(username)).stats.total_beers;
}

export async function GetUserTopBeersPaginated(
    username: string
): Promise<BeerWithRating[]> {
    let offset: number | undefined = 0;
    let partial: BeerWithRating[] = [];
    let resp: UntappdBeersResponseWithMetadata | undefined = undefined;
    while (offset !== undefined) {
        resp = await UntappdGet<UntappdBeersResponseWithMetadata>(
            `/user/beers/${username}?limit=50&offset=${offset}&sort=highest_rated_you`,
            (resp) => {
                return resp.data as UntappdBeersResponseWithMetadata;
            }
        );
        offset = resp.response.pagination.offset;
        partial = [...partial, ...resp.response.beers.items];
    }
    return partial;
}

export function GetUserTopBeers(username: string): Promise<BeerWithRating[]> {
    return UntappdGet<BeerWithRating[]>(
        `/user/beers/${username}?limit=50&offset=0&sort=highest_rated_you`,
        (resp) => {
            return (resp.data as UntappdBeersResponseWithMetadata).response
                .beers.items;
        }
    );
}

export function GetBeerInfo(beerId: number): Promise<ResponseBeer> {
    return UntappdGet<ResponseBeer>(`/beer/info/${beerId}`, (resp) => {
        return (resp.data as UntappdBeerInfoResponseWithMetadata).response
            .beer as ResponseBeer;
    });
}

export function GetBeerCheckins(
    beerId: number
): Promise<UntappdBeerCheckinsResponse> {
    return UntappdGet<UntappdBeerCheckinsResponse>(
        `/beer/checkins/${beerId}?limit=50`,
        (resp) => {
            return (resp.data as UntappdBeerCheckinsResponseWithMetadata)
                .response as UntappdBeerCheckinsResponse;
        }
    );
}

export function GetFriends(username: string): Promise<User[]> {
    return UntappdGet<User[]>(`/user/friends/${username}?limit=25`, (resp) => {
        return (resp.data as UntappdUserFriendsResponseWithMetadata).response.items.map(
            (it) => it.user
        );
    });
}

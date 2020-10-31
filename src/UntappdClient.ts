// import { readFileSync, writeFileSync } from "fs";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import {
    ResponseUser,
    UntappdUserResponseWithMetadata,
} from "./model/UntappdUserResponseModel";
import {
    UntappdBeersResponseWithMetadata,
    BeerWithRating,
} from "./model/UntappdBeersResponseModel";

// const cacheFileName = process.env.UNTAPPD_API_CALL_CACHE_FILE;
// const cacheFileEncoding = "utf-8";
// interface ExpiringResponse {
//     response: AxiosResponse<any>;
//     expires: Date;
// }
// const cache: Map<String, ExpiringResponse> = new Map<
//     String,
//     ExpiringResponse
// >();

// Object.entries(
//     JSON.parse(readFileSync(cacheFileName, cacheFileEncoding))
// ).forEach(([k, v]) => {
//     cache.set(k, v as ExpiringResponse);
// });

// function writeCache() {
//     // TODO this ain't workin', chief
//     writeFileSync(cacheFileName, JSON.stringify(cache));
// }

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

export function UntappdGet<T>(
    path: string,
    callback: (r: AxiosResponse<any>) => T
): Promise<T> {
    // const fromCache = cache.get(path);
    // if (
    //     fromCache !== undefined &&
    //     fromCache.expires !== undefined &&
    //     fromCache.expires > new Date()
    // ) {
    //     return new Promise<T>((resolve, reject) => {
    //         resolve(fromCache.response);
    //     });
    // }
    // const expires = new Date(
    //     new Date().getTime() +
    //         1000 * parseInt(process.env.UNTAPPD_API_CALL_CACHE_TTL)
    // );

    return httpClient.get(path).then((resp) => {
        // cache.set(path, {
        //     response: resp,
        //     expires: expires,
        // });
        // writeCache();
        return callback(resp);
    });
}

export function GetUser(username: string): Promise<ResponseUser> {
    return UntappdGet<ResponseUser>(`/user/info/${username}`, (resp) => {
        return (resp.data as UntappdUserResponseWithMetadata).response
            .user as ResponseUser;
    });
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

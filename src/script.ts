import "./environment";
import { config } from "dotenv";
config();

import {
    GetUser,
    GetUserTopBeers,
    GetUserTopBeersPaginated,
    GetBeerInfo,
    GetBeerCheckins,
    GetFriends,
    GetUserTotalBeers,
} from "./client/UntappdClient";
import {
    asGraphDbUntappdUser,
    GraphDbUntappdUser,
    asGraphDbUntappdBeer,
    GraphDbUntappdBeer,
} from "./model/GraphDbTypes";

import { UserRepository } from "./client/GraphDbClient";
import { Logger } from "@nestjs/common";

const userRepo = new UserRepository();
const logger = new Logger("script.ts", true);

function CacheTopRatedBeers(
    username: string = process.env.UNTAPPD_DEFAULT_USERNAME
) {
    GetUser(username)
        .then((user) => {
            userRepo
                .saveUser(user)
                .then(() => {
                    GetUserTopBeers(user.user_name)
                        .then((data) => {
                            data.forEach((beer) => {
                                userRepo
                                    .saveRating(
                                        user,
                                        beer.beer,
                                        beer.rating_score
                                    )
                                    .then(() => {})
                                    .catch((err) => {
                                        logger.warn(err);
                                    });
                            });
                        })
                        .catch((err) => {
                            logger.warn(err);
                        });
                })
                .catch((err) => {
                    logger.warn(err);
                });
        })
        .catch((err) => {
            logger.warn(err);
        });
}

function CacheFriendsTopRatedBeers(
    username: string = process.env.UNTAPPD_DEFAULT_USERNAME
) {
    CacheTopRatedBeers(username);
    GetFriends(username)
        .then((friends) => {
            friends.forEach((friend) => CacheTopRatedBeers(friend.user_name));
        })
        .catch((err) => {
            logger.warn(err);
        });
}

async function CacheTopRatedBeersPaginated(
    username: string = process.env.UNTAPPD_DEFAULT_USERNAME
): Promise<number> {
    const user = await GetUser(username);
    await userRepo.saveUser(user);
    const beers = await GetUserTopBeersPaginated(user.user_name);

    let i = 0;
    for (let beer of beers) {
        await userRepo.saveRating(user, beer.beer, beer.rating_score);
        i++;
    }
    return i;
}

async function CacheFriendsTopRatedBeersPaginated(
    username: string = process.env.UNTAPPD_DEFAULT_USERNAME
): Promise<number> {
    let apiBeers = await GetUserTotalBeers(username);
    let dbBeers = await userRepo.countRatings(username);
    let totalBeers = 0;
    if (dbBeers >= 0.9 * apiBeers) {
        totalBeers += dbBeers;
    } else {
        totalBeers += await CacheTopRatedBeersPaginated(username);
    }
    const friends = await GetFriends(username);
    for (let friend of friends) {
        apiBeers = await GetUserTotalBeers(friend.user_name);
        dbBeers = await userRepo.countRatings(friend.user_name);
        if (dbBeers >= 0.9 * apiBeers) {
            totalBeers += dbBeers;
        } else {
            try {
                totalBeers += await CacheTopRatedBeersPaginated(
                    friend.user_name
                );
            } catch {}
        }
    }
    return totalBeers;
}

CacheFriendsTopRatedBeersPaginated().then((i) => {
    console.log(`Stored ${i} beers!`);
    userRepo.getAllRatingsByUser().then((resp) => {
        console.log(
            JSON.stringify(
                resp.map((r) => {
                    return {
                        user: r.user,
                        rating: r.rating,
                        count: r.beers.length,
                    };
                })
            )
        );
    });
});

// GetBeerCheckins(15903).then((data: any) => {
//     console.log(JSON.stringify(data));
// });

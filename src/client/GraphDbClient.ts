import {
    NonTransactionalPersistenceManager,
    QuerySpecification,
    DatabaseType,
    DatabaseRegistry,
} from "@liberation-data/drivine";
import { Logger } from "@nestjs/common";
import { GraphDbUntappdBeer, GraphDbUntappdUser } from "../model/GraphDbTypes";
import { BeerWithRating } from "../model/UntappdBeersResponseModel";

function c(input: string): string {
    return input.replace(/[^a-zA-Z0-9]+/g, "_");
}

export class UserRepository {
    public persistenceManager: NonTransactionalPersistenceManager;
    logger: Logger;
    cleanedUp: boolean;
    constructor() {
        this.persistenceManager = new NonTransactionalPersistenceManager(
            DatabaseRegistry.buildOrResolveFromEnv("NEO"),
            "neo4j",
            DatabaseType.NEO4J
        );
        this.logger = new Logger("UserRepository", true);
        this.cleanedUp = false;
    }

    cleanup() {
        if (!this.cleanedUp) {
            this.cleanedUp = true;
            this.persistenceManager.connectionProvider.end();
        }
    }

    saveUser(user: GraphDbUntappdUser): Promise<any> {
        const queryString = `MERGE (u:UntappdUser {user_name: '${
            user.user_name
        }'}) SET u += {first_name:'${c(user.first_name)}', last_name:'${c(
            user.last_name
        )}'} RETURN u`;
        this.logger.debug(queryString);
        return this.persistenceManager.execute(
            new QuerySpecification(queryString)
        );
    }

    saveBeer(beer: GraphDbUntappdBeer): Promise<any> {
        const queryString = `MERGE (b:UntappdBeer {bid: ${
            beer.bid
        }}) SET b += {beer_name:'${c(beer.beer_name)}', beer_style:'${c(
            beer.beer_style
        )}'} RETURN b`;
        this.logger.debug(queryString);
        return this.persistenceManager.execute(
            new QuerySpecification(queryString)
        );
    }

    saveRating(
        user: GraphDbUntappdUser,
        beer: GraphDbUntappdBeer,
        rating: number
    ): Promise<any> {
        const queryString = `MATCH (u:UntappdUser {user_name: '${user.user_name}'}) WITH u
        MATCH (b:UntappdBeer {bid: ${beer.bid}}) WITH u, b 
        MERGE r=(u)-[:RATED {rating:${rating}}]->(b) WITH u, b, r
        RETURN u, b, r`;
        return this.saveUser(user).then(() => {
            return this.saveBeer(beer).then(() => {
                this.logger.debug(queryString);
                return this.persistenceManager.execute(
                    new QuerySpecification(queryString)
                );
            });
        });
    }

    getAllRatings(
        username: string = process.env.UNTAPPD_DEFAULT_USERNAME
    ): Promise<{ rating: number; beers: string[] }[]> {
        return this.persistenceManager
            .query<[number, string[]]>(
                new QuerySpecification<[number, string[]]>(`
                MATCH p=(u)-[r:RATED]->(b)
                WHERE u.user_name = '${username}'
                RETURN r.rating, collect(b.beer_name)
            `)
            )
            .then((resp) => {
                return resp.map((row) => {
                    return {
                        rating: row[0],
                        beers: row[1],
                    };
                });
            });
    }

    async countRatings(
        username: string = process.env.UNTAPPD_DEFAULT_USERNAME
    ): Promise<number> {
        try {
            return await this.persistenceManager.getOne<number>(
                new QuerySpecification<number>(`
                    MATCH p=(u)-[r:RATED]->(b)
                    WHERE u.user_name = '${username}'
                    RETURN count(b)
                `)
            );
        } catch {
            return 0;
        }
    }

    async getAllRatingsByUser(): Promise<
        { user: string; rating: number; beers: number[] }[]
    > {
        const resp = await this.persistenceManager.query<
            [string, number, number[]]
        >(
            new QuerySpecification<[string, number, number[]]>(`
                    MATCH p=(u)-[r:RATED]->(b)
                    RETURN u.user_name, r.rating, collect(b.bid)
                `)
        );

        return resp.map((row) => {
            return {
                user: row[0],
                rating: row[1],
                beers: row[2],
            };
        });
    }
}

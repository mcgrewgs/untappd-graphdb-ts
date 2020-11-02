"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const drivine_1 = require("@liberation-data/drivine");
const common_1 = require("@nestjs/common");
function c(input) {
    return input.replace(/[^a-zA-Z0-9]+/g, "_");
}
class UserRepository {
    constructor() {
        this.persistenceManager = new drivine_1.NonTransactionalPersistenceManager(drivine_1.DatabaseRegistry.buildOrResolveFromEnv("NEO"), "neo4j", drivine_1.DatabaseType.NEO4J);
        this.logger = new common_1.Logger("UserRepository", true);
    }
    saveUser(user) {
        const queryString = `MERGE (u:UntappdUser {user_name: '${user.user_name}'}) SET u += {first_name:'${c(user.first_name)}', last_name:'${c(user.last_name)}'} RETURN u`;
        this.logger.debug(queryString);
        return this.persistenceManager.execute(new drivine_1.QuerySpecification(queryString));
    }
    saveBeer(beer) {
        const queryString = `MERGE (b:UntappdBeer {bid: ${beer.bid}}) SET b += {beer_name:'${c(beer.beer_name)}', beer_style:'${c(beer.beer_style)}'} RETURN b`;
        this.logger.debug(queryString);
        return this.persistenceManager.execute(new drivine_1.QuerySpecification(queryString));
    }
    saveRating(user, beer, rating) {
        const queryString = `MATCH (u:UntappdUser {user_name: '${user.user_name}'}) WITH u
        MATCH (b:UntappdBeer {bid: ${beer.bid}}) WITH u, b 
        MERGE r=(u)-[:RATED {rating:${rating}}]->(b) WITH u, b, r
        RETURN u, b, r`;
        return this.saveUser(user).then(() => {
            return this.saveBeer(beer).then(() => {
                this.logger.debug(queryString);
                return this.persistenceManager.execute(new drivine_1.QuerySpecification(queryString));
            });
        });
    }
    getAllRatings(username = process.env.UNTAPPD_DEFAULT_USERNAME) {
        return this.persistenceManager
            .query(new drivine_1.QuerySpecification(`
                MATCH p=(u)-[r:RATED]->(b)
                WHERE u.user_name = '${username}'
                RETURN r.rating, collect(b.beer_name)
            `))
            .then((resp) => {
            return resp.map((row) => {
                return {
                    rating: row[0],
                    beers: row[1],
                };
            });
        });
    }
    countRatings(username = process.env.UNTAPPD_DEFAULT_USERNAME) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.persistenceManager.getOne(new drivine_1.QuerySpecification(`
                    MATCH p=(u)-[r:RATED]->(b)
                    WHERE u.user_name = '${username}'
                    RETURN count(b)
                `));
            }
            catch (_a) {
                return 0;
            }
        });
    }
    getAllRatingsByUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.persistenceManager.query(new drivine_1.QuerySpecification(`
                    MATCH p=(u)-[r:RATED]->(b)
                    RETURN u.user_name, r.rating, collect(b.bid)
                `));
            return resp.map((row) => {
                return {
                    user: row[0],
                    rating: row[1],
                    beers: row[2],
                };
            });
        });
    }
}
exports.UserRepository = UserRepository;

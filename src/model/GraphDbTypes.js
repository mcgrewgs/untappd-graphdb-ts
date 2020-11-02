"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function asGraphDbUntappdUser(user) {
    return {
        user_name: user.user_name,
        first_name: user.first_name,
        last_name: user.last_name,
    };
}
exports.asGraphDbUntappdUser = asGraphDbUntappdUser;
function asGraphDbUntappdBeer(beer) {
    return {
        bid: beer.bid,
        beer_name: beer.beer_name,
        beer_style: beer.beer_style,
    };
}
exports.asGraphDbUntappdBeer = asGraphDbUntappdBeer;

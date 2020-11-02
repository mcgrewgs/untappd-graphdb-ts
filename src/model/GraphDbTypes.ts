export interface GraphDbUntappdUser {
    user_name: string;
    first_name: string;
    last_name: string;
}

export function asGraphDbUntappdUser(
    user: GraphDbUntappdUser
): GraphDbUntappdUser {
    return {
        user_name: user.user_name,
        first_name: user.first_name,
        last_name: user.last_name,
    };
}

export interface GraphDbUntappdBeer {
    bid: number;
    beer_name: string;
    beer_style: string;
}

export function asGraphDbUntappdBeer(
    beer: GraphDbUntappdBeer
): GraphDbUntappdBeer {
    return {
        bid: beer.bid,
        beer_name: beer.beer_name,
        beer_style: beer.beer_style,
    };
}

// Generated by https://quicktype.io

export interface UntappdUserFriendsResponseWithMetadata {
    meta: Meta;
    notifications: any[];
    response: UntappdUserFriendsResponse;
}

export interface Meta {
    code: number;
    response_time: Time;
    init_time: Time;
}

export interface Time {
    time: number;
    measure: string;
}

export interface UntappdUserFriendsResponse {
    found: number;
    count: number;
    items: Item[];
    pagination: Pagination;
}

export interface Item {
    friendship_hash: string;
    created_at: string;
    mutual_friends: MutualFriends;
    user: User;
}

export interface MutualFriends {
    count: number;
    items: any[];
}

export interface User {
    uid: number;
    user_name: string;
    location: string;
    bio: string;
    is_supporter: number;
    first_name: string;
    last_name: string;
    relationship: Relationship;
    user_avatar: string;
}

export enum Relationship {
    None = "none",
}

export interface Pagination {
    next_url: string;
    offset: number;
    max_id: boolean;
}

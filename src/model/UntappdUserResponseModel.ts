// Generated by https://quicktype.io

export interface UntappdUserResponseWithMetadata {
    meta: Meta;
    notifications: any[];
    response: UntappdUserResponse;
}

export interface Meta {
    code: number;
    init_time: Time;
    response_time: Time;
}

export interface Time {
    measure: string;
    time: number;
}

export interface UntappdUserResponse {
    user: ResponseUser;
}

export interface ResponseUser {
    account_type: AccountType;
    bio: string;
    block_status: BlockStatus;
    checkins: Checkins;
    contact: any[];
    date_joined: string;
    first_name: FirstName;
    id: number;
    is_moderator: number;
    is_private: number;
    is_supporter: number;
    last_name: LastName;
    location: LocationEnum;
    media: Media;
    mute_status: string;
    rating_bump: number;
    recent_brews: Media;
    relationship: null;
    settings: any[];
    stats: Stats;
    uid: number;
    untappd_url: string;
    url: string;
    user_avatar: string;
    user_avatar_hd: string;
    user_cover_photo: string;
    user_cover_photo_offset: number;
    user_name: string;
}

export enum AccountType {
    User = "user",
}

export enum BlockStatus {
    None = "none",
}

export interface Checkins {
    count: number;
    items: CheckinsItem[];
    pagination: Pagination;
}

export interface CheckinsItem {
    badges: Badges;
    beer: PurpleBeer;
    brewery: Brewery;
    checkin_comment: string;
    checkin_id: number;
    comments: Comments;
    created_at: string;
    media: Media;
    rating_score: number;
    source: Source;
    toasts: Toasts;
    user: PurpleUser;
    venue: Venue;
}

export interface Badges {
    count: number;
    items: BadgesItem[];
    retro_status?: boolean;
}

export interface BadgesItem {
    badge_description: string;
    badge_id: number;
    badge_image: VenueIcon;
    badge_name: string;
    created_at: string;
    user_badge_id: number;
}

export interface VenueIcon {
    lg: string;
    md: string;
    sm: string;
}

export interface PurpleBeer {
    beer_abv: number;
    beer_active: number;
    beer_label: string;
    beer_name: string;
    beer_slug: string;
    beer_style: string;
    bid: number;
    has_had: boolean;
}

export interface Brewery {
    brewery_active: number;
    brewery_id: number;
    brewery_label: string;
    brewery_name: string;
    brewery_page_url: string;
    brewery_slug: string;
    brewery_type: BreweryType;
    contact: BreweryContact;
    country_name: CountryName;
    location: BreweryLocation;
}

export enum BreweryType {
    BrewPub = "Brew Pub",
    Cidery = "Cidery",
    MicroBrewery = "Micro Brewery",
    RegionalBrewery = "Regional Brewery",
}

export interface BreweryContact {
    facebook: string;
    instagram: string;
    twitter: string;
    url: string;
}

export enum CountryName {
    UnitedStates = "United States",
}

export interface BreweryLocation {
    brewery_city: string;
    brewery_state: string;
    lat: number;
    lng: number;
}

export interface Comments {
    count: number;
    items: CommentsItem[];
    total_count: number;
}

export interface CommentsItem {
    checkin_id: number;
    comment: string;
    comment_editor: boolean;
    comment_id: number;
    comment_owner: boolean;
    comment_source: string;
    created_at: string;
    user: PurpleUser;
}

export interface PurpleUser {
    account_type?: AccountType;
    bio: string;
    brewery_details?: any[];
    first_name: FirstName;
    is_supporter?: number;
    last_name: LastName;
    location: LocationEnum;
    relationship: BlockStatus | null;
    uid: number;
    user_avatar: string;
    user_name: string;
    venue_details?: any[];
    contact?: UserContact;
    is_private?: number;
    url?: string;
}

export interface UserContact {
    facebook: string;
}

export enum FirstName {
    Chuck = "Chuck",
    Gavin = "Gavin",
    Jeff = "Jeff",
    Nathan = "Nathan",
}

export enum LastName {
    D = "D.",
    M = "M.",
    S = "S.",
}

export enum LocationEnum {
    Empty = "",
    Rva = "RVA",
}

export interface Venue {
    categories: Media;
    contact: VenueContact;
    foursquare: Foursquare;
    is_verified: boolean;
    location: VenueLocation;
    parent_category_id: ParentCategoryID;
    primary_category: PrimaryCategory;
    primary_category_key: PrimaryCategory;
    venue_icon: VenueIcon;
    venue_id: number;
    venue_name: string;
    venue_slug: string;
}

export interface MediaItem {
    category_id?: string;
    category_key?: string;
    category_name?: string;
    is_primary?: boolean;
    beer?: FluffyBeer;
    brewery?: Brewery;
    checkin_id?: number;
    created_at?: string;
    photo?: Photo;
    photo_id?: number;
    user?: FluffyUser;
    venue?: Venue;
}

export interface Media {
    count: number;
    items: MediaItem[];
}

export interface VenueContact {
    twitter: Twitter;
    venue_url: string;
}

export enum Twitter {
    Buskeycider = "@buskeycider",
    Empty = "",
    Southstbrewery = "@southstbrewery",
}

export interface Foursquare {
    foursquare_id: string;
    foursquare_url: string;
}

export interface VenueLocation {
    lat: number;
    lng: number;
    venue_address: string;
    venue_city: string;
    venue_country: CountryName;
    venue_state: VenueState;
}

export enum VenueState {
    Everywhere = "Everywhere",
    Md = "MD",
    Va = "VA",
}

export enum ParentCategoryID {
    The4D4B7105D754A06376D81259 = "4d4b7105d754a06376d81259",
    The4E67E38E036454776Db1Fb3A = "4e67e38e036454776db1fb3a",
}

export enum PrimaryCategory {
    NightlifeSpot = "Nightlife Spot",
    Residence = "Residence",
}

export interface FluffyBeer {
    auth_rating?: number;
    beer_abv: number;
    beer_description: string;
    beer_label: string;
    beer_name: string;
    beer_style: string;
    bid: number;
    wish_list?: boolean;
}

export interface Photo {
    photo_img_lg: string;
    photo_img_md: string;
    photo_img_og: string;
    photo_img_sm: string;
}

export interface FluffyUser {
    account_type: AccountType;
    bio: string;
    first_name: FirstName;
    last_name: LastName;
    location: LocationEnum;
    uid: number;
    url: null;
    user_avatar: string;
    user_name: string;
}

export interface Source {
    app_name: AppName;
    app_website: string;
}

export enum AppName {
    UntappdForIPhoneV2 = "Untappd for iPhone - (V2)",
}

export interface Toasts {
    auth_toast: null;
    count: number;
    items: ToastsItem[];
    total_count: number;
}

export interface ToastsItem {
    created_at: string;
    like_id: number;
    like_owner: boolean;
    uid: number;
    user: PurpleUser;
}

export interface Pagination {
    max_id: number;
    next_url: string;
    since_url: string;
}

export interface Stats {
    total_badges: number;
    total_beers: number;
    total_checkins: number;
    total_created_beers: number;
    total_followings: number;
    total_friends: number;
    total_photos: number;
}

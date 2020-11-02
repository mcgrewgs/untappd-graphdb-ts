// Generated by https://quicktype.io

export interface UntappdBeerInfoResponseWithMetadata {
    meta: Meta;
    notifications: any[];
    response: UntappdBeerInfoResponse;
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

export interface UntappdBeerInfoResponse {
    beer: ResponseBeer;
}

export interface ResponseBeer {
    auth_rating: number;
    beer_abv: number;
    beer_active: number;
    beer_description: string;
    beer_ibu: number;
    beer_label: string;
    beer_label_hd: string;
    beer_name: string;
    beer_slug: string;
    beer_style: BeerStyle;
    bid: number;
    brewed_by: BrewedBy;
    brewery: Brewery;
    checkins: Checkins;
    created_at: string;
    friends: BrewedBy;
    is_homebrew: number;
    is_in_production: number;
    media: BrewedBy;
    rating_count: number;
    rating_score: number;
    similar: Similar;
    stats: Stats;
    vintages: BrewedBy;
    weighted_rating_score: number;
    wish_list: boolean;
}

export enum BeerStyle {
    StoutAmerican = "Stout - American",
    StoutImperialDouble = "Stout - Imperial / Double",
    StoutOatmeal = "Stout - Oatmeal",
}

export interface PurpleVenue {
    categories: BrewedBy;
    contact: VenueContact;
    foursquare: Foursquare;
    is_verified: number;
    location: VenueLocation;
    parent_category_id: string;
    primary_category: string;
    venue_icon: VenueIcon;
    venue_id: number;
    venue_name: string;
    venue_slug: string;
}

export interface BrewedByItem {
    photo?: Photo;
    photo_id?: number;
    category_id?: string;
    category_key?: string;
    category_name?: string;
    is_primary?: boolean;
    beer?: PurpleBeer;
    brewery?: Brewery;
    checkin_id?: number;
    created_at?: string;
    user?: PurpleUser;
    venue?: Array<any[] | PurpleVenue>;
}

export interface BrewedBy {
    count: number;
    items: BrewedByItem[];
}

export interface VenueContact {
    twitter: string;
    venue_url: string;
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
    venue_country?: CountryName;
    venue_state: VenueState;
}

export enum CountryName {
    UnitedStates = "United States",
}

export enum VenueState {
    Everywhere = "Everywhere",
    Va = "VA",
}

export interface VenueIcon {
    lg: string;
    md: string;
    sm: string;
}

export interface PurpleBeer {
    auth_rating?: number;
    beer_abv?: number;
    beer_active?: number;
    beer_description?: string;
    beer_ibu?: number;
    beer_label: string;
    beer_name: string;
    beer_slug: string;
    beer_style?: BeerStyle;
    beer_style_id?: number;
    bid: number;
    count?: number;
    has_had?: boolean;
    is_in_production?: number;
    on_list?: boolean;
    rating_count?: number;
    rating_score?: number;
    wish_list?: boolean;
    is_variant?: number;
    is_vintage?: number;
}

export interface Brewery {
    brewery_id: number;
    brewery_label: string;
    brewery_name: BreweryName;
    brewery_page_url: BreweryPageURL;
    brewery_slug: BrewerySlug;
    brewery_type?: string;
    contact: BreweryContact;
    country_name: CountryName;
    location: BreweryLocation;
    brewery_active?: number;
}

export enum BreweryName {
    BlueMountainBrewery = "Blue Mountain Brewery",
    MaineBeerCompany = "Maine Beer Company",
    NewHollandBrewing = "New Holland Brewing ",
    ProReNataBrewery = "Pro Re Nata Brewery",
    ThreeNotchDBrewing = "Three Notch'd Brewing",
}

export enum BreweryPageURL {
    BlueMountainBrewery = "/BlueMountainBrewery",
    Mainebeercompany = "/mainebeercompany",
    Newhollandbrew = "/newhollandbrew",
    ProReNataBrewery = "/ProReNataBrewery",
    ThreeNotchdBrewing = "/ThreeNotchdBrewing",
}

export enum BrewerySlug {
    BlueMountainBrewery = "blue-mountain-brewery",
    MaineBeerCompany = "maine-beer-company",
    NewHollandBrewing = "new-holland-brewing",
    ProReNataBrewery = "pro-re-nata-brewery",
    ThreeNotchDBrewing = "three-notch-d-brewing",
}

export interface BreweryContact {
    facebook: string;
    twitter: Twitter;
    url: string;
    instagram?: string;
}

export enum Twitter {
    Bluemtnbrewery = "bluemtnbrewery",
    Mainebeerco = "mainebeerco",
    NewHollandBrew = "NewHollandBrew",
    PRNBrewery = "PRNBrewery",
    ThreeNotchdBeer = "ThreeNotchdBeer",
}

export interface BreweryLocation {
    brewery_city: BreweryCity;
    brewery_state: BreweryState;
    lat: number;
    lng: number;
}

export enum BreweryCity {
    Afton = "Afton",
    Charlottesville = "Charlottesville",
    Crozet = "Crozet",
    Freeport = "Freeport",
    Holland = "Holland",
}

export enum BreweryState {
    Me = "ME",
    Mi = "MI",
    Va = "VA",
}

export interface Photo {
    photo_img_lg: string;
    photo_img_md: string;
    photo_img_og: string;
    photo_img_sm: string;
}

export interface PurpleUser {
    first_name: string;
    is_private: number;
    last_name: string;
    uid: number;
    user_avatar: string;
    user_name: string;
}

export interface Checkins {
    count: number;
    items: CheckinsItem[];
    pagination: Pagination;
}

export interface CheckinsItem {
    badges: Badges;
    beer: FluffyBeer;
    brewery: Brewery;
    checkin_comment: string;
    checkin_id: number;
    comments: Comments;
    created_at: string;
    media: BrewedBy;
    rating_score: number;
    source: Source;
    toasts: Comments;
    user: TentacledUser;
    venue: any[] | FluffyVenue;
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

export interface FluffyBeer {
    beer_abv: number;
    beer_active?: number;
    beer_description?: string;
    beer_ibu: number;
    beer_label: string;
    beer_name: string;
    beer_slug: string;
    beer_style: BeerStyle;
    bid: number;
    has_had: boolean;
}

export interface Comments {
    count: number;
    items: CommentsItem[];
    total_count: number;
    auth_toast?: boolean | null;
}

export interface CommentsItem {
    created_at: string;
    like_id: number;
    like_owner: boolean;
    uid: number;
    user: FluffyUser;
}

export interface FluffyUser {
    account_type: string;
    bio: string;
    brewery_details: any[];
    first_name: string;
    last_name: string;
    location: string;
    relationship: string;
    uid: number;
    user_avatar: string;
    user_name: string;
    venue_details: any[];
}

export interface Source {
    app_name: AppName;
    app_website: string;
}

export enum AppName {
    UntappdForAndroidV2 = "Untappd for Android - (V2)",
    UntappdForIPhoneV2 = "Untappd for iPhone - (V2)",
}

export interface TentacledUser {
    bio: Bio;
    first_name: string;
    is_private: number;
    is_supporter: number;
    last_name: string;
    location: LocationEnum;
    relationship: null;
    uid: number;
    url: string;
    user_avatar: string;
    user_name: string;
}

export enum Bio {
    BBCraftBeerGirlKatsCraftsWineInsta = "B&B Craft Beer Girl, Kats_Crafts&Wine -- Insta",
    BeerSure = "Beer? Sure!",
    Empty = "",
}

export enum LocationEnum {
    AlexandriaVA = "Alexandria,VA",
    Empty = "",
    LivoniaMI = "Livonia, MI",
}

export interface FluffyVenue {
    categories: BrewedBy;
    contact: VenueContact;
    foursquare: Foursquare;
    is_verified: boolean;
    location: VenueLocation;
    parent_category_id: string;
    primary_category: string;
    primary_category_key: string;
    venue_icon: VenueIcon;
    venue_id: number;
    venue_name: string;
    venue_slug: string;
}

export interface Pagination {
    max_id: number;
    next_url: string;
    since_url: string;
}

export interface Similar {
    count: number;
    items: SimilarItem[];
    method: string;
}

export interface SimilarItem {
    beer: FluffyBeer;
    brewery: Brewery;
    friends: BrewedBy;
    rating_score: number;
}

export interface Stats {
    monthly_count: number;
    total_count: number;
    total_user_count: number;
    user_count: number;
}
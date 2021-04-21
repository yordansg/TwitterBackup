export interface UserDTO {
  contributors_enabled: boolean;
  created_at: string;
  default_profile: boolean;
  default_profile_image: boolean;
  description: string;
  entities: Entities;
  favourites_count: number;
  follow_request_sent?: boolean;
  following?: boolean;
  followers_count: number;
  friends_count: number;
  geo_enabled?: boolean;
  id: number;
  id_str: string;
  is_translator?: boolean;
  lang: string;
  listed_count: number;
  location: string;
  name: string;
  notifications?: boolean;
  profile_background_color: string;
  profile_background_image_url: string;
  profile_background_image_url_https: string;
  profile_background_tile: boolean;
  profile_banner_url?: string;
  profile_image_url: string;
  profile_image_url_https: string;
  profile_link_color: string;
  profile_sidebar_border_color: string;
  profile_sidebar_fill_color: string;
  profile_text_color: string;
  profile_use_background_image: boolean;
  protected: boolean;
  screen_name: string;
  show_all_inline_media?: boolean;
  status?: Status;
  statuses_count: number;
  time_zone?: string;
  url: string;
  utc_offset?: number;
  verified: boolean;
  withheld_in_countries?: string;
  withheld_scope?: string;
}
export const dateTimeNow = new Date();

export const getUserDTODefaultValues = () => {
  return {
    contributors_enabled: false,
    created_at: dateTimeNow.toLocaleString(),
    default_profile: false,
    default_profile_image: false,
    description: '',
    entities: {
      hashtags: [],
      media: [],
      urls: [],
      user_mentions: [],
      symbols: [],
      polls: []
    },
    favourites_count: 0,
    follow_request_sent: false,
    followers_count: 0,
    following: false,
    friends_count: 0,
    geo_enabled: false,
    has_extended_profile: false,
    id: 1359524778311303200,
    id_str: '1359524778311303169',
    is_translation_enabled: false,
    is_translator: false,
    lang: '',
    listed_count: 0,
    location: '',
    name: 'defaultName',
    needs_phone_verification: false,
    notifications: false,
    profile_background_color: 'F5F8FA',
    profile_background_image_url: '',
    profile_background_image_url_https: '',
    profile_background_tile: false,
    profile_image_url:
      'http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',
    profile_image_url_https:
      'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',
    profile_link_color: '1DA1F2',
    profile_sidebar_border_color: 'C0DEED',
    profile_sidebar_fill_color: 'DDEEF6',
    profile_text_color: '333333',
    profile_use_background_image: true,
    protected: false,
    screen_name: 'defaultScreenName',
    statuses_count: 0,
    suspended: false,
    time_zone: '',
    translator_type: 'none',
    url: '',
    utc_offset: 0,
    verified: false,
  };
};

export interface Entities {
  hashtags: HashtagEntity[];
  media: MediaEntity[];
  urls: UrlEntity[];
  user_mentions: UserMentionEntity[];
  symbols: SymbolEntity[];
  polls: PollEntity[];
}

export interface UserMentionEntity {
  id: number;
  id_str: string;
  indices: [number, number];
  name: string;
  screen_name: string;
}

export interface UrlEntity {
  url: string;
  display_url: string;
  expanded_url: string;
  indices: [number, number];
}

export interface HashtagEntity {
  indices: [number, number];
  text: string;
}

export interface MediaEntity {
  id: number;
  id_str: string;
  indices: [number, number];
  url: string;
  display_url: string;
  expanded_url: string;
  media_url: string;
  media_url_https: string;
  sizes: Sizes;
  source_status_id: number;
  source_status_id_str: string;
  type: string;
}

export interface Size {
  h: number;
  w: number;
  resize: 'crop' | 'fit';
}

export interface Sizes {
  thumb: Size;
  large: Size;
  medium: Size;
  small: Size;
}

export interface SymbolEntity {
  indices: [number, number];
  text: string;
}

export interface PollEntity {
  options: PollOptions[];
  end_datetime: string;
  duration_minutes: string;
}

export interface PollOptions {
  position: number;
  text: string;
}

export interface Status {
  id: number;
  id_str: string;
  annotations?: Object;
  contributors?: Contributors[];
  coordinates?: GeoJSON.Point;
  created_at: string;
  current_user_retweet?: {
    id: number;
    id_str: string;
  };
  display_text_range?: [number, number];
  entities: Entities;
  favorite_count?: number;
  favorited?: boolean;
  filter_level: 'none' | 'low' | 'medium';
  full_text?: string;
  in_reply_to_screen_name?: string;
  in_reply_to_status_id?: number;
  in_reply_to_status_id_str?: string;
  in_reply_to_user_id?: number;
  in_reply_to_user_id_str?: string;
  is_quote_status: string;
  lang?: string;
  matching_rules?: MatchingRules[];
  place?: Place;
  possibly_sensitive?: boolean;
  quoted_status_id?: number;
  quoted_status_id_str?: string;
  quoted_status?: Status;
  retweet_count: number;
  retweeted: boolean;
  retweeted_status?: Status;
  scopes?: Object;
  source?: string;
  text?: string;
  truncated: boolean;
  user: UserDTO;
  withheld_copyright?: boolean;
  withheld_in_countries?: string[];
  withheld_scope?: string;
}

export interface Contributors {
  id: number;
  id_str: string;
  screen_name: string;
}

export interface MatchingRules {
  tag: null;
  id: number;
  id_str: string;
}

export interface PlaceAttribute {
  street_address: string;
  locality: string;
  region: string;
  iso3: string;
  postal_code: string;
  phone: string;
  twitter: string;
  url: string;
  'app:id': string;
}

export interface Place {
  geometry: GeoJSON.Point;
  attributes: PlaceAttribute;
  bounding_box: GeoJSON.Polygon;
  contained_within: Place[];
  country: string;
  country_code: string;
  full_name: string;
  id: string;
  name: string;
  place_type: string;
  url: string;
}

export interface TweetDiv {
  tweetElement: JSX.Element;
  button: JSX.Element;
  retweetButton?: JSX.Element;
  id_str: string;
}

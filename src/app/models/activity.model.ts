import { Airport } from "./airport.model";

export enum ActivityType {
  Tour = "tour",
  Transport = "transport",
  Accommodation = "accommodation",
  Food = "food",
  Others = "others",
}

export enum ActivityTransportType {
  Flight = "flight",
  Train = "train",
  Bus = "bus",
  Car = "car",
  Boat = "boat",
  Others = "others",
  Transfer = "transfer"
}

export enum ActivityCategory {
  Hotels = "hotels",
  Restaurants = "restaurants",
  Attractions = "attractions",
  Geos = "geos",
}

export enum ActivityLang {
  English = "en",
  Portuguese = "pt",
  Spanish = "es",
}

export interface Activity {
  id?: string;
  type: ActivityType;
  pin?: Pin;
  subType?: ActivityTransportType;
  startDate?: DateType;
  endDate?: DateType;
  description?: string;
  tripId: string;
  createdAt?: Date;
}

export type FlightActivityType = keyof FlightActivity;

export interface FlightActivity extends Activity {
  type: ActivityType.Transport;
  subType: ActivityTransportType.Flight;
  departure: Airport; // Departure airport
  arrival: Airport; // Arrival airport
}

export interface TransferActivity extends Activity {
  type: ActivityType.Transport;
  subType: ActivityTransportType.Transfer;
  departure: Airport | TripAdvisorActivitySearch; // Departure airport
  arrival: TripAdvisorActivitySearch | Airport; // Arrival airport
}

export interface OthersTransportActivity extends Activity {
  type: ActivityType.Transport;
  subType: ActivityTransportType;
  departure?: Partial<AddressObj>; // Departure address
  arrival?: Partial<AddressObj>; // Arrival address
}

export interface Hotel {
  id: string;
  location_id: string;
  name: string;
  description: string;
  address_obj: AddressObj;
  address: string;
  contact: Contact;
  rating: string;
  ratingUrl: string;
  numberOfReviews: string;
  photo: string;
  allPhotosLink: string;
  latitude: number;
  longitude: number;
  image: string;
  amenities: string[];
}

export interface TripAdvisorActivityPhotos {
  id: number;
  is_blessed: boolean;
  caption: string;
  published_date: Date;
  images: Images;
  album: string;
  source: Source;
}

export interface ActivityPhotos {
  id: number;
  url: string;
  width: number;
  height: number;
  caption: string;
  date: string;
}

export interface TripAdvisorActivitySearch {
  location_id: string;
  name: string;
  distance: string;
  bearing: Bearing;
  address_obj: AddressObj;
  address: string;
}

export enum Bearing {
  Northwest = "northwest",
  South = "south",
  Southwest = "southwest",
}

interface Source {
  name: string;
  localized_name: string;
}

interface Contact {
  phone?: string;
  email?: string;
  website?: string;
}

export interface TripAdvisorActivity {
  location_id: string;
  name: string;
  description?: string;
  web_url: string;
  address_obj: AddressObj;
  ancestors: Ancestor[];
  latitude: string;
  longitude: string;
  timezone: string;
  email?: string;
  phone?: string;
  website?: string;
  write_review?: string;
  ranking_data?: RankingData;
  rating?: string;
  rating_image_url?: string;
  num_reviews?: string;
  review_rating_count?: { [key: string]: string };
  subratings?: { [key: string]: Subrating };
  photo_count?: string;
  see_all_photos: string;
  price_level?: string;
  hours?: Hours;
  features?: string[];
  cuisine?: CuisineElement[];
  category: CuisineElement;
  subcategory: CuisineElement[];
  neighborhood_info: NeighborhoodInfo[];
  trip_types?: Subrating[];
  awards: Award[];
  amenities?: string[];
  styles?: string[];
  parent_brand?: string;
  brand?: string;
  groups?: Group[];
}

export interface AddressObj {
  street1?: string;
  city?: string;
  country: string;
  postalcode?: string;
  address_string: string;
  street2?: string;
  latitude?: number;
  longitude?: number;
  state?: string;
  complement?: string;
  number?: string;
}


interface Ancestor {
  level: Level;
  name: string;
  location_id: string;
}

enum Level {
  City = "City",
  Country = "Country",
  Region = "Region",
}

interface Award {
  award_type: AwardType;
  year: string;
  images: Images;
  categories: CategoryEnum[];
  display_name: AwardType;
}

enum AwardType {
  TravelersChoice = "Travelers Choice",
  TravelersChoiceBestOfTheBest = "Travelers Choice Best of the Best",
}

enum CategoryEnum {
  Luxury = "Luxury",
  Top = "Top",
  TopAttractions = "TopAttractions",
}

interface Images {
  tiny: Image;
  small: Image;
  large: Image;
}

interface Image {
  height: number;
  width: number;
  url: string;
}

interface CuisineElement {
  name: string;
  localized_name: string;
}

interface Group {
  name: string;
  localized_name: string;
  categories: CuisineElement[];
}

interface Hours {
  periods: Period[];
  weekday_text: string[];
}

interface Period {
  open: Close;
  close: Close;
}

interface Close {
  day: number;
  time: string;
}

interface NeighborhoodInfo {
  location_id: string;
  name: string;
}

interface RankingData {
  geo_location_id: string;
  ranking_string: string;
  geo_location_name: string;
  ranking_out_of: string;
  ranking: string;
}

interface Subrating {
  name: string;
  localized_name: LocalizedName;
  rating_image_url?: string;
  value: string;
}

enum LocalizedName {
  Atmosphere = "Atmosphere",
  Business = "Business",
  Cleanliness = "Cleanliness",
  Couples = "Couples",
  Family = "Family",
  Food = "Food",
  FriendsGetaway = "Friends getaway",
  Location = "Location",
  Rooms = "Rooms",
  Service = "Service",
  SleepQuality = "Sleep Quality",
  SoloTravel = "Solo travel",
  Value = "Value",
}
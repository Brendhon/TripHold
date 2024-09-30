// Custom Types

interface CountrySimple {
  name: string; // Country name
  key: string; // Country code
  flag?: string;
  states?: State[]; // States
  codes: string[]; // Country codes
}

interface Country extends CountrySimple {
  population: number;
  languages: string[];
  timezones: string[];
  currencies: string[];
  capital: string;
  carSide: Side;
  namesIntl: NameIntl;
}

interface NameIntl {
  pt: string;
  en: string;
  es: string;
}

interface State {
  key: string;
  name: string;
}

interface CityResponse {
  country: string;
  state: string;
  cities: string[];
}

interface ZipCode {
  countryCode: string[];
  city: string[];
  state: string[];
  postalCode: string[];
  latitude: number[];
  longitude: number[];
}

// DocumenterCountryAPI Types
// URL: https://documenter.getpostman.com/view/1134062/T1LJjU52#a6eeb719-e591-4b28-ba6c-71e481f71269
interface DocumenterCountryAPI {
  error: boolean;
  msg: string;
  data: Data[] | Data;
}

interface DocumenterCitiesAPI {
  error: boolean;
  msg: string;
  data: string[];
}

interface Data {
  name: string; // Country name - Common
  iso3: string; // Country code
  states: DocumenterState[]; // States
}

interface DocumenterState {
  name: string; // State name
  state_code: string; // State code
}


// RestCountriesAPI Types
// URL: https://restcountries.com/v3.1/all
interface RestCountriesAPI {
  name: Name;
  tld?: string[];
  cca2: string;
  ccn3?: string;
  cca3: string;
  independent?: boolean;
  status: Status;
  unMember: boolean;
  currencies?: { [key: string]: Currency };
  idd: Idd;
  capital?: string[];
  altSpellings: string[];
  region: Region;
  languages?: { [key: string]: string };
  translations: { [key: string]: Translation };
  latlng: number[];
  landlocked: boolean;
  area: number;
  demonyms?: Demonyms;
  flag: string;
  maps: Maps;
  population: number;
  car: Car;
  timezones: string[];
  continents: Continent[];
  flags: Flags;
  coatOfArms: CoatOfArms;
  startOfWeek: StartOfWeek;
  capitalInfo: CapitalInfo;
  cioc?: string;
  subregion?: string;
  fifa?: string;
  borders?: string[];
  gini?: { [key: string]: number };
  postalCode?: PostalCode;
}

interface CapitalInfo {
  latlng?: number[];
}

interface Car {
  signs?: string[];
  side: Side;
}

enum Side {
  Left = "left",
  Right = "right",
}

interface CoatOfArms {
  png?: string;
  svg?: string;
}

enum Continent {
  Africa = "Africa",
  Antarctica = "Antarctica",
  Asia = "Asia",
  Europe = "Europe",
  NorthAmerica = "North America",
  Oceania = "Oceania",
  SouthAmerica = "South America",
}

interface Currency {
  name: string;
  symbol: string;
}

interface Demonyms {
  eng: Eng;
  fra?: Eng;
}

interface Eng {
  f: string;
  m: string;
}

interface Flags {
  png: string;
  svg: string;
  alt?: string;
}

interface Idd {
  root?: string;
  suffixes?: string[];
}

interface Maps {
  googleMaps: string;
  openStreetMaps: string;
}

interface Name {
  common: string;
  official: string;
  nativeName?: { [key: string]: Translation };
}

interface Translation {
  official: string;
  common: string;
}

interface PostalCode {
  format: string;
  regex?: string;
}

enum Region {
  Africa = "Africa",
  Americas = "Americas",
  Antarctic = "Antarctic",
  Asia = "Asia",
  Europe = "Europe",
  Oceania = "Oceania",
}

enum StartOfWeek {
  Monday = "monday",
  Saturday = "saturday",
  Sunday = "sunday",
}

enum Status {
  OfficiallyAssigned = "officially-assigned",
  UserAssigned = "user-assigned",
}

// ZipCodeAPI Types
// URL: https://app.zipcodebase.com/api/v1
interface ZipCodeBaseResponse {
  query: Query;
  results: { [key: string]: Result[] };
}

interface Query {
  codes: string[];
  country: null;
}

interface Result {
  postal_code: string;
  country_code: string;
  latitude: string;
  longitude: string;
  city: string;
  state: string;
  state_code: string;
  province: null | string;
  province_code: null | string;
}

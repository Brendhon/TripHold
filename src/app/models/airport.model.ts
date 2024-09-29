export interface Airport {
  id: string;
  ident: string;
  type: string;
  name: string;
  elevation_ft: string;
  continent: Continent;
  iso_country: string;
  iso_region: string;
  municipality: string;
  scheduled_service: string;
  gps_code: string;
  iata_code: string;
  local_code: string;
  home_link: string;
  wikipedia_link: string;
  keywords: string;
  size: string;
  latitude: number;
  longitude: number;
}

export interface LatLng {
  [key: string]: any;
  latitude: number;
  longitude: number;
}
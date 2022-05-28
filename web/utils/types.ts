export interface Geo {
  city: string;
  country: string;
  latitude: string;
  longitude: string;
  region: string;
}

export interface LogEntry {
  timestamp: number;
  date: string;
  path: string;
  geo: Geo;
  method: string;
  browser: {};
  device: {};
}

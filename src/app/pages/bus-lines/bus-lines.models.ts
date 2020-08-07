export interface BusLine {
  id: string;
  code: string;
  name: string;
  type: BusLineType;
}

export interface BusLinePage {
  current?: number;
  limit?: number;
}

export interface BusLineData {
  page: BusLinePage;
  items: BusLine[];
  totalItems: number;
}

export enum BusLineType {
  Bus = 'o',
  Stocking = 'l',
}

export interface BusLineItinerary {
  busLine: BusLine;
  locations: Location[];
}

export interface BusLineItineraryLocation {
  order: number;
  lat: string;
  lng: string;
  urlMap: string;
}

export interface BusLineApi {
  id: string;
  codigo: string;
  nome: string;
}

export interface BusLine {
  id: string;
  code: string;
  name: string;
  type: BusLineType;
}

export interface BusLinePage {
  page?: number;
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

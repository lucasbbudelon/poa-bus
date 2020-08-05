import { of } from 'rxjs';
import { BusLineData, BusLineType, BusLineItinerary } from './bus-lines.models';

export class BusLinesServiceMock {
    getBusLines = jest.fn().mockReturnValue(of(BUS_LINE_DATA_MOCK));
    getItinerary = jest.fn().mockReturnValue(of(BUS_LINES_ITINERARY_MOCK));
}

export const BUS_LINE_DATA_MOCK: BusLineData = {
    page: {
        limit: 10,
        page: 1
    },
    items: [
        {
            id: "5485",
            code: "T11-1",
            name: "3ª PERIMETRAL",
            type: BusLineType.Bus
        },
        {
            id: "5978",
            code: "7052-1",
            name: "AEROPORTO/CEASA",
            type: BusLineType.Bus
        },
        {
            id: "5414",
            code: "282-2",
            name: "CRUZEIRO DO SUL",
            type: BusLineType.Bus
        },
        {
            id: "5745",
            code: "274-2",
            name: "GLORIA/AZENHA/CASCATINHA",
            type: BusLineType.Bus
        },
        {
            id: "52",
            code: "50.11-1",
            name: "AUXILIADORA - ANITA",
            type: BusLineType.Stocking
        },
        {
            id: "15",
            code: "10.4-1",
            name: "IPANEMA",
            type: BusLineType.Stocking
        },
    ],
    totalItems: 6
};

export const BUS_LINES_ITINERARY_MOCK: BusLineItinerary = {
    busLine: BUS_LINE_DATA_MOCK.items[0],
    locations: []
}

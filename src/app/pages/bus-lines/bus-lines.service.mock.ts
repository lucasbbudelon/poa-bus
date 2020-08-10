import { of } from 'rxjs';

import { BusLine, BusLineData, BusLineItinerary, BusLineType } from './bus-lines.models';

export class BusLinesServiceMock {
    getBusLines = jest.fn().mockReturnValue(of(BUS_LINE_DATA_MOCK));
    getItinerary = jest.fn().mockReturnValue(of(BUS_LINES_ITINERARY_MOCK));
}

export const BUS_LINE_MOCK: BusLine = {
    id: '5485',
    code: 'T11-1',
    name: '3ª PERIMETRAL',
    type: BusLineType.Bus
};

export const BUS_LINE_DATA_MOCK: BusLineData = {
    page: {
        limit: 10,
        current: 1
    },
    items: [
        {
            id: '5485',
            code: 'T11-1',
            name: '3ª PERIMETRAL',
            type: BusLineType.Bus
        },
        {
            id: '5978',
            code: '7052-1',
            name: 'AEROPORTO/CEASA',
            type: BusLineType.Bus
        },
        {
            id: '5414',
            code: '282-2',
            name: 'CRUZEIRO DO SUL',
            type: BusLineType.Bus
        },
        {
            id: '5745',
            code: '274-2',
            name: 'GLORIA/AZENHA/CASCATINHA',
            type: BusLineType.Bus
        },
        {
            id: '52',
            code: '50.11-1',
            name: 'AUXILIADORA - ANITA',
            type: BusLineType.Stocking
        },
        {
            id: '15',
            code: '10.4-1',
            name: 'IPANEMA',
            type: BusLineType.Stocking
        },
    ],
    totalItems: 6
};

export const BUS_LINES_ITINERARY_MOCK: BusLineItinerary = {
    busLine: this.BUS_LINE_MOCK,
    locations: []
};

export const BUS_LINE_API_MOCK = [
    {
        id: '5665',
        codigo: '490-2',
        nome: 'MORRO SANTANA'
    },
    {
        id: '5486',
        codigo: 'T11-2',
        nome: '3ª PERIMETRAL'
    },
    {
        id: '5726',
        codigo: '178-2',
        nome: 'PRAIA DE BELAS'
    },
    {
        id: '5833',
        codigo: '855-1',
        nome: 'PROTASIO/CAIRU'
    },
    {
        id: '5612',
        codigo: '353-1',
        nome: 'IPIRANGA / PUC / UFRGS'
    },
    {
        id: '5583',
        codigo: '340-1',
        nome: 'JARDIM BOTANICO'
    },
    {
        id: '5024',
        codigo: '184-1',
        nome: 'JUCA BATISTA'
    },
    {
        id: '5680',
        codigo: '4951-1',
        nome: 'MANOEL ELIAS/MORRO SANTANA'
    },
    {
        id: '32',
        codigo: '20.6-2',
        nome: 'GLORIA'
    },
    {
        id: '45',
        codigo: '40.2-1',
        nome: 'JOAO ABOTT'
    },
];

export const BUS_LINES_ITINERARY_API_MOCK = {
    0: {
        lat: '-30.02091857422600000',
        lng: '-51.10401713620700000'
    },
    1: {
        lat: '-30.02080957422600000',
        lng: '-51.10340913620700000'
    },
    2: {
        lat: '-30.02079457422600000',
        lng: '-51.10332613620700000'
    },
    3: {
        lat: '-30.02075357422600000',
        lng: '-51.10310013620700000'
    },
    4: {
        lat: '-30.02071757422600000',
        lng: '-51.10289913620700000'
    },
    5: {
        lat: '-30.02092657422600000',
        lng: '-51.10284513620700000'
    },
    6: {
        lat: '-30.02152757422600000',
        lng: '-51.10274113620700000'
    },
    7: {
        lat: '-30.02172157422600000',
        lng: '-51.10270213620700000'
    },
    8: {
        lat: '-30.02215557422600000',
        lng: '-51.10262813620700000'
    },
    9: {
        lat: '-30.02238257422600000',
        lng: '-51.10259513620700000'
    },
    idlinha: BUS_LINE_MOCK.id,
    nome: BUS_LINE_MOCK.name,
    codigo: BUS_LINE_MOCK.code
};

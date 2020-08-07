import { of } from 'rxjs';
import { DomSanitizerMock } from 'src/app/test/mocks/dom-sanitizer.mock';
import { HttpClientMock } from 'src/app/test/mocks/http-client.mock';
import { environment } from 'src/environments/environment';

import { PAGINATION_MAX_SIZE } from './bus-lines.constants';
import { BusLineType } from './bus-lines.models';
import { BusLinesService } from './bus-lines.service';
import {
  BUS_LINE_API_MOCK,
  BUS_LINE_DATA_MOCK,
  BUS_LINE_MOCK,
  BUS_LINES_ITINERARY_API_MOCK,
} from './bus-lines.service.mock';

describe('BusLineService', () => {
  let service: BusLinesService;
  let sanitizer: DomSanitizerMock;
  let httpMock: HttpClientMock;

  beforeEach(() => {
    httpMock = new HttpClientMock();
    sanitizer = new DomSanitizerMock();
    service = new BusLinesService(httpMock as any, sanitizer as any);
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('when fetching bus lines', () => {

    beforeEach(() => {
      httpMock.get.mockReturnValue(of(BUS_LINE_API_MOCK));
    });

    describe('should data is not loaded', () => {

      beforeEach(() => {
        Object.defineProperty(service, 'busLines', {
          get: jest.fn().mockReturnValue(null),
        });
      });

      it('should call api data poa', () => {
        service
          .getBusLines({ current: 1, limit: PAGINATION_MAX_SIZE })
          .subscribe((data) => {
            expect(httpMock.get).toHaveBeenCalledWith(`${environment.apiDataPoa}/php/facades/process.php?a=nc&p=%25&t=${BusLineType.Bus}`);
            expect(httpMock.get).toHaveBeenCalledWith(`${environment.apiDataPoa}/php/facades/process.php?a=nc&p=%25&t=${BusLineType.Stocking}`);
          });
      });
    });

    describe('should data is already loaded', () => {

      beforeEach(() => {
        Object.defineProperty(service, 'busLines', {
          get: jest.fn().mockReturnValue(BUS_LINE_DATA_MOCK.items),
        });
      });

      it('don"t should call api data poa', () => {
        service
          .getBusLines({ current: 1, limit: PAGINATION_MAX_SIZE })
          .subscribe((data) => {
            expect(httpMock.get).not.toHaveBeenCalled();
            expect(httpMock.get).not.toHaveBeenCalled();
          });
      });
    });

    describe('should return paged results', () => {
      it('page one', () => {
        service
          .getBusLines({ current: 1, limit: 5 })
          .subscribe((data) => expect(data).toMatchSnapshot());
      });

      it('page two', () => {
        service
          .getBusLines({ current: 2, limit: 5 })
          .subscribe((data) => expect(data).toMatchSnapshot());
      });

      it('page three', () => {
        service
          .getBusLines({ current: 3, limit: 5 })
          .subscribe((data) => expect(data).toMatchSnapshot());
      });
    });

    describe('when filter values', () => {

      beforeEach(() => {
        Object.defineProperty(service, 'busLines', {
          get: jest.fn().mockReturnValue(BUS_LINE_DATA_MOCK.items),
        });
      });

      it('should filter by id', () => {
        service
          .getBusLines({ current: 1, limit: PAGINATION_MAX_SIZE }, BUS_LINE_DATA_MOCK.items[2].id)
          .subscribe((data) => expect(data).toMatchSnapshot());
      });

      it('should filter by code', () => {
        service
          .getBusLines({ current: 1, limit: PAGINATION_MAX_SIZE }, BUS_LINE_DATA_MOCK.items[1].code)
          .subscribe((data) => expect(data).toMatchSnapshot());
      });

      it('should filter by name', () => {
        service
          .getBusLines({ current: 1, limit: PAGINATION_MAX_SIZE }, BUS_LINE_DATA_MOCK.items[4].name)
          .subscribe((data) => expect(data).toMatchSnapshot());
      });
    });
  });

  it('when fetching itinerary', () => {

    httpMock.get.mockReturnValue(of(BUS_LINES_ITINERARY_API_MOCK));

    service
      .getItinerary(BUS_LINE_MOCK)
      .subscribe((data) => {
        expect(httpMock.get).toHaveBeenCalledWith(`${environment.apiDataPoa}/php/facades/process.php?a=il&p=${BUS_LINE_MOCK.id}`);
        expect(data).toMatchSnapshot();
      });
  });
});

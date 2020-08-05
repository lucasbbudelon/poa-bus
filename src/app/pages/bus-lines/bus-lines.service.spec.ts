import { TestBed } from '@angular/core/testing';

import { BusLinesService } from './bus-lines.service';
import { HttpClientMock } from 'src/app/test/mocks/http-client.mock';
import { DomSanitizerMock } from 'src/app/test/mocks/dom-sanitizer.mock';

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
});

import { TestBed } from '@angular/core/testing';

import { BusLinesService } from './bus-lines.service';

describe('BusLineService', () => {
  let service: BusLinesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusLinesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { async, ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppTestingModule } from 'src/app/test/app-testing-module.module';

import { BusLinesComponent } from './bus-lines.component';
import { MODAL_ITINERARY_OPTIONS } from './bus-lines.constants';
import { BusLinesService } from './bus-lines.service';
import { BUS_LINE_DATA_MOCK, BusLinesServiceMock, BUS_LINE_MOCK } from './bus-lines.service.mock';
import { BusLinesItineraryComponent } from './components/bus-lines-itinerary/bus-lines-itinerary.component';
import { BusLinesTypeComponent } from './components/bus-lines-type/bus-lines-type.component';
import { BusLinePage } from './bus-lines.models';

describe('BusLinesComponent', () => {
  let component: BusLinesComponent;
  let fixture: ComponentFixture<BusLinesComponent>;
  let injector: TestBed;

  let busLinesService: BusLinesService;
  let modalService: NgbModal;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BusLinesComponent,
        BusLinesTypeComponent,
      ],
      imports: [AppTestingModule],
      providers: [
        { provide: BusLinesService, useClass: BusLinesServiceMock },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusLinesComponent);
    component = fixture.componentInstance;
    injector = getTestBed();
    busLinesService = injector.get(BusLinesService);
    modalService = injector.get(NgbModal);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture).toBeTruthy();
    expect(busLinesService.getBusLines).toHaveBeenCalledWith(component.firstPage);
  });

  it('when build form', () => {
    component.subscribeToSearchChanges = jest.fn();
    component.subscribeToPageSizeChanges = jest.fn();
    component.buildForm();

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.formGroup.value).toMatchSnapshot();
      expect(component.subscribeToSearchChanges).toHaveBeenCalled();
      expect(component.subscribeToPageSizeChanges).toHaveBeenCalled();
    });
  });

  it('should search change', () => {
    const search = 'teste123';
    component.search.patchValue(search);
    expect(busLinesService.getBusLines).toHaveBeenCalledWith(component.firstPage, search);
    expect(component.data).toBe(BUS_LINE_DATA_MOCK);
  });

  it('should page size change', () => {
    const newPage: BusLinePage = {
      current: component.currentPage,
      limit: 25
    };
    component.pageSize.patchValue(newPage.limit);
    expect(busLinesService.getBusLines).toHaveBeenCalledWith(newPage);
    expect(component.data).toBe(BUS_LINE_DATA_MOCK);
  });

  it('when load first page', () => {
    component.loadFirstPage();
    expect(busLinesService.getBusLines).toHaveBeenCalledWith(component.firstPage);
    expect(component.data).toBe(BUS_LINE_DATA_MOCK);
  });

  it('when load next page', () => {
    component.currentPage = 1;
    component.loadNextPage();
    expect(busLinesService.getBusLines).toHaveBeenCalledWith(component.nextPage);
    expect(component.data).toBe(BUS_LINE_DATA_MOCK);
  });

  it('should open itinerary', () => {
    component.openItinerary(BUS_LINE_MOCK);
    expect(busLinesService.getItinerary).toHaveBeenCalledWith(BUS_LINE_MOCK);
    expect(modalService.open).toHaveBeenCalledWith(BusLinesItineraryComponent, MODAL_ITINERARY_OPTIONS);
  });
});

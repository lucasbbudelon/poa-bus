import { async, ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AppTestingModule } from 'src/app/test/app-testing-module.module';
import { NgbModalMock } from 'src/app/test/mocks/ngb-modal.mock';

import { BusLinesComponent } from './bus-lines.component';
import { BusLinesService } from './bus-lines.service';
import { BusLinesServiceMock } from './bus-lines.service.mock';
import { BusLinesTypeComponent } from './components/bus-lines-type/bus-lines-type.component';

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
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(fixture).toBeTruthy();
  });
});

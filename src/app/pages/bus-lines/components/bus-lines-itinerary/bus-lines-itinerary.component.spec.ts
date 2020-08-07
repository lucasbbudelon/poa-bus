import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppTestingModule } from 'src/app/test/app-testing-module.module';

import { BUS_LINES_ITINERARY_MOCK } from '../../bus-lines.service.mock';
import { BusLinesTypeComponent } from '../bus-lines-type/bus-lines-type.component';
import { BusLinesItineraryComponent } from './bus-lines-itinerary.component';

describe('BusLinesItineraryComponent', () => {
  let component: BusLinesItineraryComponent;
  let fixture: ComponentFixture<BusLinesItineraryComponent>;
  let activeModal: NgbActiveModal;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BusLinesItineraryComponent, BusLinesTypeComponent],
      imports: [AppTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusLinesItineraryComponent);
    component = fixture.componentInstance;
    component.itinerary = BUS_LINES_ITINERARY_MOCK;
    activeModal = TestBed.get(NgbActiveModal);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should close modal', () => {
    fixture.debugElement.nativeElement.querySelector('button.close').click();
    expect(activeModal.close).toHaveBeenCalled();
  });
});

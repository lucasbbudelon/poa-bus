import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusLinesItineraryComponent } from './bus-lines-itinerary.component';
import { AppTestingModule } from 'src/app/test/app-testing-module.module';
import { BusLinesTypeComponent } from '../bus-lines-type/bus-lines-type.component';
import { BUS_LINES_ITINERARY_MOCK } from '../../bus-lines.service.mock';

describe('BusLinesItineraryComponent', () => {
  let component: BusLinesItineraryComponent;
  let fixture: ComponentFixture<BusLinesItineraryComponent>;

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
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});

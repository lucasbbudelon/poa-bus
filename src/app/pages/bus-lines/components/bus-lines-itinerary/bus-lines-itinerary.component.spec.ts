import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusLinesItineraryComponent } from './bus-lines-itinerary.component';

describe('BusLinesItineraryComponent', () => {
  let component: BusLinesItineraryComponent;
  let fixture: ComponentFixture<BusLinesItineraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusLinesItineraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusLinesItineraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

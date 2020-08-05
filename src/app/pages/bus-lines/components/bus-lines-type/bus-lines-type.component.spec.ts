import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusLinesTypeComponent } from './bus-lines-type.component';

describe('BusLinesTypeComponent', () => {
  let component: BusLinesTypeComponent;
  let fixture: ComponentFixture<BusLinesTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusLinesTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusLinesTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

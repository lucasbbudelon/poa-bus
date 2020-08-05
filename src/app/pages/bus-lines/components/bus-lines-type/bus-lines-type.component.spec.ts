import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusLinesTypeComponent } from './bus-lines-type.component';
import { BusLineType } from '../../bus-lines.models';

describe('BusLinesTypeComponent', () => {
  let component: BusLinesTypeComponent;
  let fixture: ComponentFixture<BusLinesTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BusLinesTypeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusLinesTypeComponent);
    component = fixture.componentInstance;
    Object.defineProperty(component, 'busLineType', {
      get: jest.fn().mockReturnValue(BusLineType),
    });
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('when type=Bus', () => {
    component.type = BusLineType.Bus;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('when type=Stocking', () => {
    component.type = BusLineType.Stocking;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});

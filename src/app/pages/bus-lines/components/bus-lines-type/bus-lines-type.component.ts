import { Component, Input } from '@angular/core';

import { BusLineType } from '../../bus-lines.models';

@Component({
  selector: 'app-bus-lines-type',
  templateUrl: './bus-lines-type.component.html',
  styleUrls: ['./bus-lines-type.component.scss']
})
export class BusLinesTypeComponent {
  @Input() type: BusLineType;
  get busLineType() { return BusLineType; }
  constructor() { }
}

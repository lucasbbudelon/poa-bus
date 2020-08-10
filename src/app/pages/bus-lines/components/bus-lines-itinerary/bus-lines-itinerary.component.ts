import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { BusLineItinerary } from '../../bus-lines.models';

@Component({
  selector: 'app-bus-lines-itinerary',
  templateUrl: './bus-lines-itinerary.component.html',
  styleUrls: ['./bus-lines-itinerary.component.scss']
})
export class BusLinesItineraryComponent {
  @Input() itinerary: BusLineItinerary;
  public iframeLoadind = true;
  constructor(public activeModal: NgbActiveModal) { }
}

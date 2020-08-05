import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbPaginationModule, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

import { BusLinesComponent } from './bus-lines.component';
import { BusLinesRouting } from './bus-lines.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BusLinesItineraryComponent } from './components/bus-lines-itinerary/bus-lines-itinerary.component';
import { BusLinesTypeComponent } from './components/bus-lines-type/bus-lines-type.component';

@NgModule({
  declarations: [
    BusLinesComponent,
    BusLinesItineraryComponent,
    BusLinesTypeComponent
  ],
  imports: [
    CommonModule,
    BusLinesRouting,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbAccordionModule
  ],
})
export class BusLinesModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { BusLinesComponent } from './bus-lines.component';
import { BusLinesRouting } from './bus-lines.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [BusLinesComponent],
  imports: [
    CommonModule,
    BusLinesRouting,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
  ],
})
export class BusLinesModule {}

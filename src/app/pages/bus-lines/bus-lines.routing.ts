import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BusLinesComponent } from './bus-lines.component';

const routes: Routes = [
  {
    path: '',
    component: BusLinesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusLinesRouting {}

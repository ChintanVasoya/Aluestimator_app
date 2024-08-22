import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoorPage } from './door.page';

const routes: Routes = [
  {
    path: '',
    component: DoorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoorPageRoutingModule {}

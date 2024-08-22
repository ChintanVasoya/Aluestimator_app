import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WindowPage } from './window.page';

const routes: Routes = [
  {
    path: '',
    component: WindowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WindowPageRoutingModule {}

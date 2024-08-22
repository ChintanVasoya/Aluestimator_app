import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WindowPageRoutingModule } from './window-routing.module';

import { WindowPage } from './window.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WindowPageRoutingModule
  ],
  declarations: [WindowPage]
})
export class WindowPageModule {}

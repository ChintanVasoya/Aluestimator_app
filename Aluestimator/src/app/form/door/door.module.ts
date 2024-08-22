import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoorPageRoutingModule } from './door-routing.module';

import { DoorPage } from './door.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoorPageRoutingModule
  ],
  declarations: [DoorPage]
})
export class DoorPageModule {}

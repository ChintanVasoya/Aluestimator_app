import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PartitionPageRoutingModule } from './partition-routing.module';

import { PartitionPage } from './partition.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PartitionPageRoutingModule
  ],
  declarations: [PartitionPage]
})
export class PartitionPageModule {}

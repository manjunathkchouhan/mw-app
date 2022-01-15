import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubTaskDetailsPageRoutingModule } from './sub-task-details-routing.module';

import { SubTaskDetailsPage } from './sub-task-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubTaskDetailsPageRoutingModule
  ],
  declarations: [SubTaskDetailsPage]
})
export class SubTaskDetailsPageModule {}

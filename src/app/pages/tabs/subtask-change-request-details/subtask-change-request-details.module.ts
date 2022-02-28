import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubtaskChangeRequestDetailsPageRoutingModule } from './subtask-change-request-details-routing.module';

import { SubtaskChangeRequestDetailsPage } from './subtask-change-request-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubtaskChangeRequestDetailsPageRoutingModule
  ],
  declarations: [SubtaskChangeRequestDetailsPage]
})
export class SubtaskChangeRequestDetailsPageModule {}

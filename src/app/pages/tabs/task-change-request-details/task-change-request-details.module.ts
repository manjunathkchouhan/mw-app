import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskChangeRequestDetailsPageRoutingModule } from './task-change-request-details-routing.module';

import { TaskChangeRequestDetailsPage } from './task-change-request-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskChangeRequestDetailsPageRoutingModule
  ],
  declarations: [TaskChangeRequestDetailsPage]
})
export class TaskChangeRequestDetailsPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubtaskChangeRequestPageRoutingModule } from './subtask-change-request-routing.module';

import { SubtaskChangeRequestPage } from './subtask-change-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubtaskChangeRequestPageRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [SubtaskChangeRequestPage]
})
export class SubtaskChangeRequestPageModule {}

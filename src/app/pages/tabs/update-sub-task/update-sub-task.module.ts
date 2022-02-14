import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateSubTaskPageRoutingModule } from './update-sub-task-routing.module';

import { UpdateSubTaskPage } from './update-sub-task.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateSubTaskPageRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [UpdateSubTaskPage]
})
export class UpdateSubTaskPageModule {}

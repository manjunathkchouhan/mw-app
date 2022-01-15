import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddSubTaskPageRoutingModule } from './add-sub-task-routing.module';

import { AddSubTaskPage } from './add-sub-task.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddSubTaskPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [AddSubTaskPage]
})
export class AddSubTaskPageModule {}

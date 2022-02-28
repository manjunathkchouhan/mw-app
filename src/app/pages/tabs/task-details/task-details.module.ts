import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskDetailsPageRoutingModule } from './task-details-routing.module';

import { TaskDetailsPage } from './task-details.page';
import { FileOpener } from '@ionic-native/file-opener/ngx';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskDetailsPageRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    FileOpener,
  ],
  declarations: [TaskDetailsPage]
})
export class TaskDetailsPageModule {}

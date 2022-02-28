import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComplitedTaskListPageRoutingModule } from './complited-task-list-routing.module';

import { ComplitedTaskListPage } from './complited-task-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComplitedTaskListPageRoutingModule
  ],
  declarations: [ComplitedTaskListPage]
})
export class ComplitedTaskListPageModule {}

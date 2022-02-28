import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskChangeRequestListPageRoutingModule } from './task-change-request-list-routing.module';

import { TaskChangeRequestListPage } from './task-change-request-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskChangeRequestListPageRoutingModule
  ],
  declarations: [TaskChangeRequestListPage]
})
export class TaskChangeRequestListPageModule {}

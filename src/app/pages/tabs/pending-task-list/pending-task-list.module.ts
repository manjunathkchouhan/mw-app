import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PendingTaskListPageRoutingModule } from './pending-task-list-routing.module';

import { PendingTaskListPage } from './pending-task-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PendingTaskListPageRoutingModule
  ],
  declarations: [PendingTaskListPage]
})
export class PendingTaskListPageModule {}

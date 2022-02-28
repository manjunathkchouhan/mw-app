import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PendingSubtaskListPageRoutingModule } from './pending-subtask-list-routing.module';

import { PendingSubtaskListPage } from './pending-subtask-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PendingSubtaskListPageRoutingModule
  ],
  declarations: [PendingSubtaskListPage]
})
export class PendingSubtaskListPageModule {}

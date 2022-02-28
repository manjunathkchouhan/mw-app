import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubtaskChangeRequestListPageRoutingModule } from './subtask-change-request-list-routing.module';

import { SubtaskChangeRequestListPage } from './subtask-change-request-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubtaskChangeRequestListPageRoutingModule
  ],
  declarations: [SubtaskChangeRequestListPage]
})
export class SubtaskChangeRequestListPageModule {}

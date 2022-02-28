import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComplitedSubtaskListPageRoutingModule } from './complited-subtask-list-routing.module';

import { ComplitedSubtaskListPage } from './complited-subtask-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComplitedSubtaskListPageRoutingModule
  ],
  declarations: [ComplitedSubtaskListPage]
})
export class ComplitedSubtaskListPageModule {}

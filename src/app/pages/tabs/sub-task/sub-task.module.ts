import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubTaskPageRoutingModule } from './sub-task-routing.module';

import { SubTaskPage } from './sub-task.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubTaskPageRoutingModule,
    Ng2SearchPipeModule

  ],
  declarations: [SubTaskPage]
})
export class SubTaskPageModule {}

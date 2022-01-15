import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddSubTaskPage } from './add-sub-task.page';

const routes: Routes = [
  {
    path: '',
    component: AddSubTaskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddSubTaskPageRoutingModule {}

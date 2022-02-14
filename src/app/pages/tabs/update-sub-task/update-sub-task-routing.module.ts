import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateSubTaskPage } from './update-sub-task.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateSubTaskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateSubTaskPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskChangeRequestDetailsPage } from './task-change-request-details.page';

const routes: Routes = [
  {
    path: '',
    component: TaskChangeRequestDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskChangeRequestDetailsPageRoutingModule {}

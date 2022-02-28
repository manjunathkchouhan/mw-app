import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskChangeRequestListPage } from './task-change-request-list.page';

const routes: Routes = [
  {
    path: '',
    component: TaskChangeRequestListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskChangeRequestListPageRoutingModule {}

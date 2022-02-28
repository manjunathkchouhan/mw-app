import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PendingTaskListPage } from './pending-task-list.page';

const routes: Routes = [
  {
    path: '',
    component: PendingTaskListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PendingTaskListPageRoutingModule {}

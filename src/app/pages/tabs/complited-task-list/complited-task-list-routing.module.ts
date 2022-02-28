import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComplitedTaskListPage } from './complited-task-list.page';

const routes: Routes = [
  {
    path: '',
    component: ComplitedTaskListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComplitedTaskListPageRoutingModule {}

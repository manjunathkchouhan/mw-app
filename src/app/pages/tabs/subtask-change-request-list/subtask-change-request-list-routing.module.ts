import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubtaskChangeRequestListPage } from './subtask-change-request-list.page';

const routes: Routes = [
  {
    path: '',
    component: SubtaskChangeRequestListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubtaskChangeRequestListPageRoutingModule {}

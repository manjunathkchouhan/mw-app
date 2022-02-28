import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PendingSubtaskListPage } from './pending-subtask-list.page';

const routes: Routes = [
  {
    path: '',
    component: PendingSubtaskListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PendingSubtaskListPageRoutingModule {}

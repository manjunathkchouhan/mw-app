import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComplitedSubtaskListPage } from './complited-subtask-list.page';

const routes: Routes = [
  {
    path: '',
    component: ComplitedSubtaskListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComplitedSubtaskListPageRoutingModule {}

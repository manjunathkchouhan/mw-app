import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubtaskChangeRequestPage } from './subtask-change-request.page';

const routes: Routes = [
  {
    path: '',
    component: SubtaskChangeRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubtaskChangeRequestPageRoutingModule {}

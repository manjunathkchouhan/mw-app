import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubtaskChangeRequestDetailsPage } from './subtask-change-request-details.page';

const routes: Routes = [
  {
    path: '',
    component: SubtaskChangeRequestDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubtaskChangeRequestDetailsPageRoutingModule {}

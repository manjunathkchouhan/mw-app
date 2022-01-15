import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubTaskDetailsPage } from './sub-task-details.page';

const routes: Routes = [
  {
    path: '',
    component: SubTaskDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubTaskDetailsPageRoutingModule {}

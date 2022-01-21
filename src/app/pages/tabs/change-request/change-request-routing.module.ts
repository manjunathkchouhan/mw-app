import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangeRequestPage } from './change-request.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeRequestPageRoutingModule {}

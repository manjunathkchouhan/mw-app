import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeRequestPageRoutingModule } from './change-request-routing.module';

import { ChangeRequestPage } from './change-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangeRequestPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ChangeRequestPage]
})
export class ChangeRequestPageModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserModalComponent } from './modal/user-modal/user-modal.component';
import { ApproveComponent } from './modal/approve/approve.component';
import { FormsModule } from '@angular/forms';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FilterComponent } from './modal/filter/filter.component';
import { FilterSubtaskComponent } from './modal/filter-subtask/filter-subtask.component';


@NgModule({
  declarations: [AppComponent,UserModalComponent,ApproveComponent, FilterComponent,FilterSubtaskComponent],
  entryComponents: [UserModalComponent,ApproveComponent,FilterComponent,FilterSubtaskComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule, BrowserAnimationsModule, FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, FileOpener],
  bootstrap: [AppComponent],
})
export class AppModule {}

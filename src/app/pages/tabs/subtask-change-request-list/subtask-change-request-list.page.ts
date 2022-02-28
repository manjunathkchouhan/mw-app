/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { AuthenticationService } from 'src/app/services/authentication.service';
const TOKEN_KEY = 'my-token';
import {Location} from '@angular/common';

import { ViewWillEnter } from '@ionic/angular';
@Component({
  selector: 'app-subtask-change-request-list',
  templateUrl: './subtask-change-request-list.page.html',
  styleUrls: ['./subtask-change-request-list.page.scss'],
})
export class SubtaskChangeRequestListPage implements OnInit , ViewWillEnter{
  token;
  subTaskChangeRequestList;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private _location: Location
  ) { }

  ngOnInit() {
    this.getUserDetails();
  }
  async getUserDetails() {
    const token = await Storage.get({ key: TOKEN_KEY });
    if (token && token.value) {
      this.token = JSON.parse(token.value);
      this.getComplitedTask();
    }
  }
  onPendingTaskDetails(taskid) {
    this.router.navigate(['/tabs/task-details/' + taskid]);
  }
  ionViewWillEnter() {
    this.getComplitedTask();
  }

  getComplitedTask(){
    const user = {
      user_id: this.token.user_id,
      role_id: this.token.role_id
    };
    this.authService.getSubtaskChangeRequestList(user).subscribe((res: any) =>{
      console.log(res);
      if(res){
        this.subTaskChangeRequestList =  res;
      }
    });
  }

  onClickList(changeRequestId){
    console.log(changeRequestId);
    this.router.navigate(['/tabs/subtask-change-request-details/' + changeRequestId]);
  }
  goBack(){
     this.router.navigate(['/tabs/dashboard']);
  }
}

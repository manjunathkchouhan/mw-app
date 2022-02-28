/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { AuthenticationService } from 'src/app/services/authentication.service';
const TOKEN_KEY = 'my-token';
import {Location} from '@angular/common';

@Component({
  selector: 'app-task-change-request-list',
  templateUrl: './task-change-request-list.page.html',
  styleUrls: ['./task-change-request-list.page.scss'],
})
export class TaskChangeRequestListPage implements OnInit {
  token;
  taskChangeRequestList;

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
    this.authService.getTaskChangeRequestList(user).subscribe((res: any) =>{
      console.log(res);
      if(res){
        this.taskChangeRequestList =  res;
      }
    });
  }
  onClickList(ChangeRequestId){
    this.router.navigate(['/tabs/task-change-request-details/' + ChangeRequestId]);
  }
  goBack(){
    this.router.navigate(['/tabs/dashboard']);
  }
}

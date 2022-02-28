/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { AuthenticationService } from 'src/app/services/authentication.service';
const TOKEN_KEY = 'my-token';

@Component({
  selector: 'app-pending-subtask-list',
  templateUrl: './pending-subtask-list.page.html',
  styleUrls: ['./pending-subtask-list.page.scss'],
})
export class PendingSubtaskListPage implements OnInit {
  token;
  pendingSubTaskList;

  constructor(
    private router: Router,
    private authService: AuthenticationService
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
  onPendingSubTaskDetails(subTaskId) {
    this.router.navigate(['/tabs/sub-task-details/' + subTaskId]);
  }

  getComplitedTask(){
    const user = {
      user_id: this.token.user_id,
      role_id: this.token.role_id
    };
    this.authService.getPendingSubTaskList(user).subscribe((res: any) =>{
      console.log(res);
      if(res){
        this.pendingSubTaskList =  res;
      }
    });
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { AuthenticationService } from 'src/app/services/authentication.service';
const TOKEN_KEY = 'my-token';

@Component({
  selector: 'app-complited-subtask-list',
  templateUrl: './complited-subtask-list.page.html',
  styleUrls: ['./complited-subtask-list.page.scss'],
})
export class ComplitedSubtaskListPage implements OnInit {
  token;
  complitedSubTaskList;
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
  onSubTaskDetails(subTaskId) {
    this.router.navigate(['/tabs/sub-task-details/' + subTaskId]);
  }

  getComplitedTask(){
    const user = {
      user_id: this.token.user_id,
      role_id: this.token.role_id
    };
    this.authService.getComplitedSubTaskList(user).subscribe((res: any) =>{
      console.log(res);
      if(res){
        this.complitedSubTaskList =  res;
      }
    });
  }

}

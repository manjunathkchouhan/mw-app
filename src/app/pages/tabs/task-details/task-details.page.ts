/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Storage } from '@capacitor/storage';
const TOKEN_KEY = 'my-token';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.page.html',
  styleUrls: ['./task-details.page.scss'],
})
export class TaskDetailsPage implements OnInit {
  singleTask;
  token;
  taskId;

  constructor(
    private authService: AuthenticationService,
    private routes: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.taskId = this.activatedRoute.snapshot.paramMap.get('task_id');
    console.log(this.taskId);
  }

  ngOnInit() {
  this.getUserDetails();
    this.getTaskDetails();
  }
  async getUserDetails(){
    const token = await Storage.get({ key: TOKEN_KEY });
    if (token && token.value) {
      // console.log('set token: ', token.value);
      this.token = JSON.parse(token.value);
    }
  }
  getTaskDetails(){
    const task = {
         task_id: this.taskId
     };
     this.authService.getTaskDetails(task).subscribe((res: any)=>{
       if(res){
         this.singleTask = res;
       }
     });
   }
   onAddSubTask(){
     this.routes.navigate(['/tabs/add-sub-task/' + this.taskId]);
   }

}

/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { AuthenticationService } from 'src/app/services/authentication.service';
const TOKEN_KEY = 'my-token';
import { format, parseISO } from 'date-fns';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-change-request-details',
  templateUrl: './task-change-request-details.page.html',
  styleUrls: ['./task-change-request-details.page.scss'],
  providers: [ DatePipe ]
})
export class TaskChangeRequestDetailsPage implements OnInit {
  token;
  taskChangeRequestDetails;
  taskChangeRequestId;
  selected;
  dateValue ='';
  extend_date;
  today;
  dateTill;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe
  ) {
    this.taskChangeRequestId = this.activatedRoute.snapshot.paramMap.get('task_change_request_id');
    console.log(this.taskChangeRequestId);
   }

  ngOnInit() {
    this.getChangeRequestDetails();
    // this.getUserDetails();
  }
  formatDate2(value: string){
    return format(parseISO(value), 'MMM dd yyyy');
  }
  async getUserDetails() {
    const token = await Storage.get({ key: TOKEN_KEY });
    if (token && token.value) {
      this.token = JSON.parse(token.value);
      // this.getComplitedTask();
    }
  }

  getChangeRequestDetails(){
    const user = {
      task_change_request_id: this.taskChangeRequestId
    };
    this.authService.getChangeRequestDetails(user).subscribe((res: any) =>{
      console.log(res);
      if(res){
        this.taskChangeRequestDetails =  res;
        this.today = new Date(this.taskChangeRequestDetails.start_date);
        this.today.setDate(this.today.getDate()+1);
        this.dateTill = this.today.toISOString().substring(0, 10);
        console.log(this.dateTill );
        this.selected = this.taskChangeRequestDetails.users;
      }
    });
  }

  onCancel(){
    console.log('cancel');
    const requestData = {
      task_change_request_id: this.taskChangeRequestId
    };
    console.log(requestData);
    this.authService.cancelTaskChangeRequest(requestData).subscribe(res =>{
      if(res){
        console.log(res);
        this.router.navigate(['/tabs/task-change-request-list']);
      }
    });
  }
  onApprove(){
    if(this.selected){
      var result = this.selected.map(a => a.user_id);
    }
    // this.createTask.value.user_id = JSON.stringify(this.selected.user_id);
    const process = {
      task_id:this.taskChangeRequestDetails.task_id,
      task_change_request_id: this.taskChangeRequestDetails.task_change_request_id,
      change_request_type:this.taskChangeRequestDetails.change_request_type,
      extended_date:  this.datePipe.transform(this.extend_date, 'yyyy-MM-dd'),
      user_list: JSON.stringify(result)
    };
    console.log(process);
    this.authService.processTaskChangeRequest(process).subscribe(res =>{
      if(res){
        console.log(res);
        this.router.navigate(['/tabs/task-change-request-list']);
      }
    });
  }

}

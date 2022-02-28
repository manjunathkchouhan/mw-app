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
  selector: 'app-subtask-change-request-details',
  templateUrl: './subtask-change-request-details.page.html',
  styleUrls: ['./subtask-change-request-details.page.scss'],
  providers: [ DatePipe ]
})
export class SubtaskChangeRequestDetailsPage implements OnInit {

  token;
  subTaskChangeRequestDetails;
  subTaskChangeRequestId;
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
    this.subTaskChangeRequestId = this.activatedRoute.snapshot.paramMap.get('subtask_change_request_id');
    console.log(this.subTaskChangeRequestId);
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
    console.log(this.subTaskChangeRequestId);
    const user = {
      subtask_change_request_id: this.subTaskChangeRequestId
    };
    this.authService.getChangeRequestDetailsForSubTask(user).subscribe((res: any) =>{
      console.log(res);
      if(res){
        this.subTaskChangeRequestDetails = res;
        this.today = new Date(this.subTaskChangeRequestDetails.start_date);
        this.today.setDate(this.today.getDate()+1);
        this.dateTill = this.today.toISOString().substring(0, 10);
        this.selected = this.subTaskChangeRequestDetails.users;
      }
    });
  }
  onCancel(){
    const requestData = {
      subtask_change_request_id: this.subTaskChangeRequestId
    };
    this.authService.cancelChangeRequestForSubTask(requestData).subscribe(res =>{
      if(res){
        console.log(res);
        this.router.navigate(['/tabs/subtask-change-request-list']);
      }
    });
  }
  onApprove(){
    if(this.selected){
      var result = this.selected.map(a => a.user_id);
    }
    const process = {
      sub_task_id: this.subTaskChangeRequestDetails.sub_task_id,
      subtask_change_request_id: this.subTaskChangeRequestDetails.subtask_change_request_id,
      change_request_type:this.subTaskChangeRequestDetails.change_request_type,
      extended_date:  this.datePipe.transform(this.extend_date, 'yyyy-MM-dd'),
      user_list: JSON.stringify(result)
    };
    console.log(process);
    this.authService.processChangeRequestForSubTask(process).subscribe(res =>{
      if(res){
        console.log(res);
        this.router.navigate(['/tabs/subtask-change-request-list']);
      }
    });
  }
}

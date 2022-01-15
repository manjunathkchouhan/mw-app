/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sub-task-details',
  templateUrl: './sub-task-details.page.html',
  styleUrls: ['./sub-task-details.page.scss'],
})
export class SubTaskDetailsPage implements OnInit {
  subTaskId;
  subTaskDetails: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService
  ) {
    this.subTaskId = this.activatedRoute.snapshot.paramMap.get('sub_task_id');
    console.log(this.subTaskId);
  }

  ngOnInit() {
    this.getSubTaskDetails();
  }
  getSubTaskDetails(){
    const subtaskId = {
      sub_task_id:this.subTaskId
    };
    this.authService.getSubTaskDetails(subtaskId).subscribe((res: any) =>{
      console.log(res);
      this.subTaskDetails = res;
    });
  }


}

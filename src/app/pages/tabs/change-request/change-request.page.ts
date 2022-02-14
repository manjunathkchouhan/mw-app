/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Storage } from '@capacitor/storage';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
const TOKEN_KEY = 'my-token';

@Component({
  selector: 'app-change-request',
  templateUrl: './change-request.page.html',
  styleUrls: ['./change-request.page.scss'],
})
export class ChangeRequestPage implements OnInit {
  changeRequest: FormGroup;
  taskId;
  token;
  usersInTask;
  usersNotInTask;
  changeRequestTypes;
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    public navCtrl: NavController,
    private loadingController: LoadingController,
    private alertController: AlertController
    ) {
      this.taskId = this.activatedRoute.snapshot.paramMap.get('task_id');
      console.log(this.taskId);
    this.changeRequest = this.formBuilder.group({
      change_request_type: ['', Validators.required],
      description: [''],
      user_id: [''],
      user_list: [''],
      task_id:[this.taskId]
    });
   }
  ngOnInit() {
    this.getUserDetails();
    this.getUserList();
  }
  async getUserDetails(){
    const token = await Storage.get({ key: TOKEN_KEY });
    if (token && token.value) {
      this.token = JSON.parse(token.value);
    }
  }
 async changeRequestForm(){
    const loading = await this.loadingController.create();
    await loading.present();
    this.changeRequest.value.user_id =  this.token.user_id;
    this.changeRequest.value.user_list = JSON.stringify(this.changeRequest.value.user_list);
    this.authService.taskChangeRequest(this.changeRequest.value).subscribe(async (res: any)=>{
      if(res.status === 'FAILED'){
        loading.dismiss();
        const alert = await this.alertController.create({
          header: res.status,
          message: res.message,
          buttons: ['retry...'],
        });
       await alert.present();
      }else {
        loading.dismiss();
        this.navCtrl.navigateRoot(['/tabs/task-details/'  + this.taskId]);
      }
    });
  }
  getUserList(){
    const task = {
      task_id: this.taskId
    };
    this.authService.getUserListForChangeRequest(task).subscribe((res: any) =>{
      if(res){
        this.usersInTask=  res.users_in_task;
        this.usersNotInTask =  res.users_not_in_task;
        this.changeRequestTypes = res.change_request_types;
      }
    });
  }

}

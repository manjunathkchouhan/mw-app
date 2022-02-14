/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
const TOKEN_KEY = 'my-token';
import { Storage } from '@capacitor/storage';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-update-sub-task',
  templateUrl: './update-sub-task.page.html',
  styleUrls: ['./update-sub-task.page.scss'],
})
export class UpdateSubTaskPage implements OnInit {
  updateSubTask: FormGroup;
  taskStatus;
  subtaskId;
  token;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController
    ) {
      this.subtaskId = this.activatedRoute.snapshot.paramMap.get('sub_task_id');
      this.getUserDetails();
   }
  ngOnInit() {
    this.updateSubTask = this.formBuilder.group({
      task_status: ['', Validators.required],
      description: [''],
      has_attachment: ['false'],
      file_extension : [''],
      base64_file: [''],
    });
  }
  async getUserDetails(){
    const token = await Storage.get({ key: TOKEN_KEY });
    if (token && token.value) {
      this.token = JSON.parse(token.value);
      this.getTaskStatus();
    }
  }
 async updateSubTaskForm(){
    console.log(this.updateSubTask.value);
    if(this.updateSubTask.value.has_attachment === true){
      this.updateSubTask.value.has_attachment = 'YES';
    }else {
      this.updateSubTask.value.has_attachment = 'NO';
    }
    this.updateSubTask.value.sub_task_id = this.subtaskId;
    this.updateSubTask.value.user_id = this.token.user_id;
    const loading = await this.loadingController.create();
    await loading.present();
    this.authService.updateSubTask(this.updateSubTask.value)
    .subscribe(async (res: any) =>{
      if(res.status === 'SUCCESS'){
        console.log(res);
        loading.dismiss();
        this.router.navigate(['/tabs/sub-task-details/' + this.subtaskId]);
      }else if(res.status === 'FAILED') {
        loading.dismiss();
        const alert = await this.alertController.create({
          header: res.status,
          message: res.message,
          buttons: ['retry...'],
        });
       await alert.present();
      }
    });
  }
  getTaskStatus(){
    console.log(this.token);
    this.authService.getTaskStatusForUpdate({role_id:this.token.role_id}).subscribe((res: any) =>{
      if(res){
        this.taskStatus = res;
      }
    });
  }

  onImagePicked(event: any) {
    const file = event.target.files[0];
    const name = event.target.files[0].name;
    const lastDot = name.lastIndexOf('.');
    const fileName = name.substring(0, lastDot);
    const ext = name.substring(lastDot + 1);
    this.updateSubTask.patchValue({ file_name: fileName });
    this.updateSubTask.get('file_name')?.updateValueAndValidity();
    this.updateSubTask.patchValue({ file_extension: '.'+ ext });
    this.updateSubTask.get('file_extension')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      console.log(reader.result);
      // eslint-disable-next-line prefer-const
      let base64 = reader.result;
      this.updateSubTask.patchValue({ base64_file: base64 });
      this.updateSubTask.get('base64_file')?.updateValueAndValidity();
    };
    reader.readAsDataURL(file);
  }


}

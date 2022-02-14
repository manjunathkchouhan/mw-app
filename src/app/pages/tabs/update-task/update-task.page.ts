/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
const TOKEN_KEY = 'my-token';
import { Storage } from '@capacitor/storage';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.page.html',
  styleUrls: ['./update-task.page.scss'],
})
export class UpdateTaskPage implements OnInit {
  updateTask: FormGroup;
  taskStatus;
  taskId;
  token;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController
    ) {
      this.taskId = this.activatedRoute.snapshot.paramMap.get('task_id');
      console.log(this.taskId);
      this.getUserDetails();
   }
  ngOnInit() {
    this.updateTask = this.formBuilder.group({
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
 async updateTaskForm(){
    if(this.updateTask.value.has_attachment === true){
      this.updateTask.value.has_attachment = 'YES';
    }else {
      this.updateTask.value.has_attachment = 'NO';
    }
    this.updateTask.value.task_id = this.taskId;
    this.updateTask.value.user_id = this.token.user_id;
    const loading = await this.loadingController.create();
    await loading.present();
    this.authService.updateTask(this.updateTask.value)
    .subscribe(async (res: any) =>{
      console.log(res);
      if(res.status === 'SUCCESS'){
        console.log(res);
        loading.dismiss();
        this.router.navigate(['/tabs/task-details/' + this.taskId]);
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
    this.authService.getTaskStatusForUpdate({role_id: this.token.role_id}).subscribe((res: any) =>{
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
    this.updateTask.patchValue({ file_name: fileName });
    this.updateTask.get('file_name')?.updateValueAndValidity();
    this.updateTask.patchValue({ file_extension: '.'+ ext });
    this.updateTask.get('file_extension')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      console.log(reader.result);
      // eslint-disable-next-line prefer-const
      let base64 = reader.result;
      this.updateTask.patchValue({ base64_file: base64 });
      this.updateTask.get('base64_file')?.updateValueAndValidity();
    };
    reader.readAsDataURL(file);
  }

}

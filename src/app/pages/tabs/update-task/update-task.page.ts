/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
const TOKEN_KEY = 'my-token';
import { Storage } from '@capacitor/storage';

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
    private router: Router
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
    this.getTaskStatus();
  }
  async getUserDetails(){
    const token = await Storage.get({ key: TOKEN_KEY });
    if (token && token.value) {
      // console.log('set token: ', token.value);
      this.token = JSON.parse(token.value);
    }
  }
  updateTaskForm(){
    console.log(this.updateTask.value);
    if(this.updateTask.value.has_attachment === true){
      this.updateTask.value.has_attachment = 'YES';
    }else {
      this.updateTask.value.has_attachment = 'NO';
    }
    this.updateTask.value.task_id = this.taskId;
    this.updateTask.value.user_id = this.token.user_id;
    this.authService.updateTask(this.updateTask.value)
    .subscribe((res: any) =>{
      console.log(res);
      this.router.navigate(['/tabs/task-details/' + this.taskId]);
    });
  }
  getTaskStatus(){
    this.authService.getTaskStatusForUpdate().subscribe((res: any) =>{
      console.log(res);
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

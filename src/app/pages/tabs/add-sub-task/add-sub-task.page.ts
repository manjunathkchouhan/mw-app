/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, ViewChild } from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonDatetime, LoadingController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { Storage } from '@capacitor/storage';
// import { IonicSelectableComponent } from 'ionic-selectable';
const TOKEN_KEY = 'my-token';


@Component({
  selector: 'app-add-sub-task',
  templateUrl: './add-sub-task.page.html',
  styleUrls: ['./add-sub-task.page.scss'],
  providers: [ DatePipe ]
})
export class AddSubTaskPage implements OnInit {
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;
  allUsers;
  createSubTask: FormGroup;
  allProjects;
  taskPriorities: any;
  filteredOptions: Observable<string[]>;
  filteredUsers: Observable<string[]>;
  projectsOptions: string[] = [];
  userOptions: string[] = [];
  myControl = new FormControl();
  intervals: any;
  weekDays: any;
  dateValue = '';
  dateValue2 = '';
  dateValue3 ='';
  token;
  singleTask: any;
  taskId;
  dateTill;
  today;
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private datePipe: DatePipe,
    private routes: Router,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {
    this.taskId = this.activatedRoute.snapshot.paramMap.get('task_id');
    console.log(this.taskId);
  }

  ngOnInit(): void {
    this.today = new Date();
    this.today.setDate(this.today.getDate());
    this.dateTill = this.today.toISOString().substring(0, 10);
    this.form();
    this.getAllPriorities();
    this.getAllUsers();
    this.getTaskInterval();
    this.getUserDetails();
  }

  async getUserDetails(){
    const token = await Storage.get({ key: TOKEN_KEY });
    if (token && token.value) {
      // console.log('set token: ', token.value);
      this.token = JSON.parse(token.value);
    }
  }

  form(){
    this.createSubTask = this.formBuilder.group({
      task_id: [''],
      sub_task_title: ['',Validators.required],
      user_id: ['',Validators.required],
      description: [''],
      sub_task_priority: ['',Validators.required],
      start_date: ['',Validators.required],
      end_date: ['',Validators.required],
      task_interval: ['',Validators.required],
      has_attachment: ['false'],
      file_extension: [''],
      file_name: [''],
      base64_file: [''],
      created_by: ['']
    });
  }
  formatDate(value: string) {
    return format(parseISO(value), 'MMM dd yyyy');
  }
  formatDate2(value: string){
    return format(parseISO(value), 'MMM dd yyyy');
  }


  private userfilter(value1): string[] {
    const filterValue1 = value1.toLowerCase();
    return this.userOptions.filter(u => u.toLowerCase().includes(filterValue1));
  }
  getAllUsers(){
    this.authenticationService.getUsers().subscribe((res: any) =>{
      console.log(res);
      if(res){
        this.allUsers = res;
        this.allUsers.forEach(element => {
              this.userOptions.push(element.first_name);
        });
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.filteredUsers =  this.createSubTask.get('user_id')!.valueChanges.pipe(
          startWith(''),
          map(value1 => this.userfilter(value1)),
        );
      }
    });
  }
  getAllPriorities(){
    this.authenticationService.getTaskPriorities().subscribe((res: any) =>{
      if(res){
        console.log(res);
        this.taskPriorities = res;
      }
    });
  }
  getTaskInterval(){
    this.authenticationService.getTaskIntervals().subscribe((res: any) =>{
      if(res){
        this.intervals = res;
        console.log(this.intervals);
      }
    });
  }

 async createSubTaskSubmit(){
    // console.log(this.createSubTask.value)
    if(this.createSubTask.value.has_attachment === true){
      this.createSubTask.value.has_attachment = 'YES';
    }else {
      this.createSubTask.value.has_attachment = 'NO';
    }
    this.createSubTask.value.start_date = this.datePipe.transform(this.createSubTask.value.start_date, 'yyyy-MM-dd');
    this.createSubTask.value.end_date = this.datePipe.transform(this.createSubTask.value.end_date, 'yyyy-MM-dd');
    this.createSubTask.value.user_id = JSON.stringify(this.createSubTask.value.user_id);
    this.createSubTask.value.task_id = this.taskId;
    this.createSubTask.value.created_by = this.token.user_id;
    console.log(this.createSubTask.value);
    const loading = await this.loadingController.create();
    await loading.present();
    this.authenticationService.addSubTask(this.createSubTask.value).subscribe(async (res: any) =>{
      console.log(res);
      if(res.status === 'SUCCESS'){
        loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Added Subtask successfully',
          buttons: ['OK'],
        });
       await alert.present();
        this.routes.navigate(['/tabs/sub-task']);
      }else {
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
  onImagePicked(event: any) {
    //  console.log(event.target.files);
    // file_name
    const file = event.target.files[0];

    const name = event.target.files[0].name;
    const lastDot = name.lastIndexOf('.');

    const fileName = name.substring(0, lastDot);
    const ext = name.substring(lastDot + 1);
    this.createSubTask.patchValue({ file_name: fileName });
    this.createSubTask.get('file_name')?.updateValueAndValidity();
    this.createSubTask.patchValue({ file_extension: '.'+ ext });
    this.createSubTask.get('file_extension')?.updateValueAndValidity();
    const reader = new FileReader();

    reader.onload = () => {
      console.log(reader.result);
      // eslint-disable-next-line prefer-const
      let base64 = reader.result;
      this.createSubTask.patchValue({ base64_file: base64 });
      this.createSubTask.get('base64_file')?.updateValueAndValidity();
    };

    reader.readAsDataURL(file);
  }
}

/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { AlertController, IonDatetime, LoadingController, NavController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { Storage } from '@capacitor/storage';
const TOKEN_KEY = 'my-token';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
  providers: [ DatePipe ]
})
export class AddTaskPage implements OnInit {
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;
  allUsers;
  createTask: FormGroup;
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
  today;
  dateTill;
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private datePipe: DatePipe,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController,
    public navCtrl: NavController,
    private ngZone: NgZone
  ) { }

 ngOnInit() {
  this.today = new Date();
  this.today.setDate(this.today.getDate());
  this.dateTill = this.today.toISOString().substring(0, 10);
    this.getUserDetails();
    this.form();
    this.getAllProjects();
    this.getAllPriorities();
    this.getAllUsers();
    this.getTaskInterval();
  }
  form(){
    this.createTask = this.formBuilder.group({
      task_title: ['', Validators.required],
      category_id: [''],
      user_id: ['',Validators.required],
      project_id: ['',Validators.required],
      description: [''],
      task_priority: ['',Validators.required],
      start_date: ['',Validators.required],
      end_date: ['',Validators.required],
      task_interval: ['',Validators.required],
      has_attachment: ['false'],
      file_extension : [''],
      file_name: [''],
      base64_file: [''],
      created_by: ['']
    });
    this.createTask.patchValue({ start_date: this.dateTill});
    this.createTask.get('start_date')?.updateValueAndValidity();
    // this.createTask.patchValue({ end_date: this.dateTill});
    // this.createTask.get('end_date')?.updateValueAndValidity();
  }
  formatDate(value: string) {
    return format(parseISO(value), 'MMM dd yyyy');
  }
  formatDate2(value: string){
    return format(parseISO(value), 'MMM dd yyyy');
  }
  async getUserDetails(){
    const token = await Storage.get({ key: TOKEN_KEY });
    if (token && token.value) {
      // console.log('set token: ', token.value);
      this.token = JSON.parse(token.value);
    }
  }

  logForm() {
    console.log(this.createTask.value);
  }
  private _filter(value): string[] {
    const filterValue = value.toLowerCase();
    return this.projectsOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  private userfilter(value1): string[] {
    const filterValue1 = value1.toLowerCase();
    return this.userOptions.filter(u => u.toLowerCase().includes(filterValue1));
  }

  getAllProjects(){
    this.authenticationService.getProjectsTask().subscribe((res: any) =>{
      console.log(res);
      if(res){
        this.allProjects = res;
        this.allProjects.forEach(element => {
              this.projectsOptions.push(element.project_title);
        });
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.filteredOptions =  this.createTask.get('project_id')!.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value)),
        );
      }
    });
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
        this.filteredUsers =  this.createTask.get('user_id')!.valueChanges.pipe(
          startWith(''),
          map(value1 => this.userfilter(value1)),
        );
      }
    });
  }
  getAllPriorities(){
    this.authenticationService.getTaskPriorities().subscribe((res: any) =>{
      console.log(res);
      if(res){
        this.taskPriorities = res;
        const filterResult = this.taskPriorities.filter(filterData => filterData.task_priority === 'HIGH');
        this.createTask.patchValue({
          task_priority:filterResult[0].task_priority
      });
      }
    });
  }
  getTaskInterval(){
    this.authenticationService.getTaskIntervals().subscribe((res: any) =>{
      console.log(res);
      if(res){
        this.intervals = res;
        const filterR = this.intervals.filter(filter => filter.task_interval === 'ONCE');
        console.log(filterR);
        this.createTask.patchValue({
          task_interval:filterR[0].task_interval
      });
      }
    });
  }

  async createTaskSubmit(){
    this.createTask.value.created_by = this.token.user_id;
    if(this.createTask.value.has_attachment === true){
      this.createTask.value.has_attachment = 'YES';
    }else {
      this.createTask.value.has_attachment = 'NO';
    }
    this.createTask.value.start_date = this.datePipe.transform(this.createTask.value.start_date, 'yyyy-MM-dd');
    this.createTask.value.end_date = this.datePipe.transform(this.createTask.value.end_date, 'yyyy-MM-dd');
    this.allProjects.filter(p =>{
      if(p.project_id === this.createTask.value.project_id){
        this.createTask.value.category_id = p.category_id;
      }
    });
    this.createTask.value.user_id = JSON.stringify(this.createTask.value.user_id);
    const loading = await this.loadingController.create();
    await loading.present();
    console.log(this.createTask.value);
    this.authenticationService.addTask(this.createTask.value).subscribe(async (res: any) =>{
      console.log(res);
      if(res.status === 'SUCCESS'){
        loading.dismiss();
      //   const alert = await this.alertController.create({
      //     header: 'Added task successfully',
      //     buttons: ['OK'],
      //   });
      //  await alert.present();
       this.router.navigateByUrl('/tabs/task', {replaceUrl: true});
      }else{
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
    const file = event.target.files[0];
    const name = event.target.files[0].name;
    const lastDot = name.lastIndexOf('.');
    const fileName = name.substring(0, lastDot);
    const ext = name.substring(lastDot + 1);
    this.createTask.patchValue({ file_name: fileName });
    this.createTask.get('file_name')?.updateValueAndValidity();
    this.createTask.patchValue({ file_extension: '.'+ ext });
    this.createTask.get('file_extension')?.updateValueAndValidity();
    const newInstance = this.getFileReader();
      newInstance.readAsDataURL(event.target.files[0]);
      newInstance.onload = (imgsrc) => {
        const url = (imgsrc.target as FileReader).result;
        console.log(url);
        this.createTask.patchValue({ base64_file: url });
        this.createTask.get('base64_file')?.updateValueAndValidity();
      };
    // this.ngZone.run(() =>{
    //   const reader = new FileReader();
    //   console.log('reader',reader);
    //   reader.onload = (e) => {
    //     console.log(reader.result);
    //     // eslint-disable-next-line prefer-const
    //     let base64 = reader.result;
    //     this.createTask.patchValue({ base64_file: base64 });
    //     this.createTask.get('base64_file')?.updateValueAndValidity();
    //   };
    //   reader.readAsDataURL(file);
    // });
  }
  public getFileReader(): FileReader {
    const fileReader = new FileReader();
    // eslint-disable-next-line @typescript-eslint/dot-notation
    const zoneOriginalInstance = (fileReader as any)['__zone_symbol__originalInstance'];
    return zoneOriginalInstance || fileReader;
  }
}


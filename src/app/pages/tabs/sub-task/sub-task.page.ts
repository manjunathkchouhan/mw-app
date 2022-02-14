/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoadingController, MenuController, ModalController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';
import { Event, NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { Subscription } from 'rxjs';
const TOKEN_KEY = 'my-token';
import { filter, pairwise } from 'rxjs/operators';
import { FilterSubtaskComponent } from 'src/app/modal/filter-subtask/filter-subtask.component';

@Component({
  selector: 'app-sub-task',
  templateUrl: './sub-task.page.html',
  styleUrls: ['./sub-task.page.scss'],
})
export class SubTaskPage implements OnInit {
  subTasksList: any;
  filterTerm: string;
  token;
  originalData;
  // private subTaskListSub: Subscription;
  // query: any;
  // restaurants: any[];

  constructor(
    private authenticationService: AuthenticationService,
    private menu: MenuController,
    private router: Router,
    private loadingController: LoadingController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    // this.subTaskListSub = this.authenticationService.getSubTaskData.subscribe(taskData =>{
    //   this.subTasksList = taskData;
    // });
    this.getUserDetails();
  }
  async getUserDetails(){
    const token = await Storage.get({ key: TOKEN_KEY });
    if (token && token.value) {
      this.token = JSON.parse(token.value);;
    }
  }
  async ionViewWillEnter() {
    const loading = await this.loadingController.create();
    await loading.present();
    const user = {
      role_id: this.token.role_id,
      user_id: this.token.user_id
    };
    this.authenticationService.getSubTaskList(user).subscribe((res: any) =>{
      if(res){
        loading.dismiss();
        console.log(res);
        this.subTasksList = res;
        this.originalData = res;
      }
    });
  }
  async openMenu(){
    await this.menu.open();
  }
  onSubTaskDetails(subTaskId){
    this.router.navigate(['/tabs/sub-task-details/' + subTaskId]);
  }
  async filterShow(){
    const modal = await this.modalCtrl.create({
      component: FilterSubtaskComponent,
      componentProps: {taskList: this.subTasksList}
    });
    modal.onDidDismiss().then(async (dataReturned) => {
      console.log(dataReturned);
      if (dataReturned.data && dataReturned.data.length > 0) {
        this.subTasksList = dataReturned.data;
        //alert('Modal Sent Data :'+ dataReturned);
      }else{
        this.subTasksList = this.originalData;
      }
    });
    return await modal.present();
    //  if(value === false){
    //   this.filter = true;
    //  }else {
    //   this.filter = false;
    //  }
   }
}

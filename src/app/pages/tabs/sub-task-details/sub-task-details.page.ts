/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserModalComponent } from '../../../modal/user-modal/user-modal.component';

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
    private authService: AuthenticationService,
    private routes: Router,
    private modalCtrl: ModalController,
    private loadingController: LoadingController
  ) {
    this.subTaskId = this.activatedRoute.snapshot.paramMap.get('sub_task_id');
    console.log(this.subTaskId);
  }

  ngOnInit() {
    this.getSubTaskDetails();
  }
  ionViewWillEnter() {
    this.getSubTaskDetails();
  }
 async getSubTaskDetails(){
    const subtaskId = {
      sub_task_id:this.subTaskId
    };
    const loading = await this.loadingController.create();
    await loading.present();
    this.authService.getSubTaskDetails(subtaskId).subscribe((res: any) =>{
      console.log(res);
      loading.dismiss();
      this.subTaskDetails = res;
    });
  }

  onUpdateSubTask(){
    this.routes.navigate(['/tabs/update-sub-task/' + this.subTaskId]);
  }
  onChangeRequest(){
    this.routes.navigate(['/tabs/subtask-change-request/' + this.subTaskId]);
  }
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: UserModalComponent,
      componentProps: {user: this.subTaskDetails.sub_task_users}
    });
    return await modal.present();
  }
  openFile(file){
    console.log('file');
  }
}

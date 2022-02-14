/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.scss'],
})
export class ApproveComponent implements OnInit {
  user_id;
  task_id;
  description;

  constructor(
    private authService: AuthenticationService,
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) { }
  ngOnInit() {
    console.log(this.user_id, this.task_id);
  }
  dismiss() {
    this.modalCtrl.dismiss();
  }
 async approveTaskForm(){
    const loading = await this.loadingController.create();
    await loading.present();
      const taskApprove = {
        description:this.description,
        user_id: this.user_id,
        task_id: this.task_id
      };
      console.log(taskApprove);
      this.authService.approveTask(taskApprove).subscribe(async (res: any) =>{
        console.log(res);
        if(res.status === 'SUCCESS'){
          loading.dismiss();
          const onClosedData = 'Wrapped Up!';
          this.modalCtrl.dismiss(onClosedData);
        }else if(res.status === 'FAILED'){
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
  }

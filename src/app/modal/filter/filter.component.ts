/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { format, parseISO } from 'date-fns';
import { Storage } from '@capacitor/storage';
import { DatePipe } from '@angular/common';
const TOKEN_KEY = 'my-token';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  providers: [ DatePipe ]
})
export class FilterComponent implements OnInit {
taskList;
filterResult;
taskStatus;
dateValue = '';
dateValue2 = '';
dateValue3 ='';
start_date;
end_date;
selectedPriority;
selectedStatus;
taskPriorities;
token;
today;
dateTill;
  constructor(
    private modalCtrl: ModalController,
    private authenticationService: AuthenticationService,
    private datePipe: DatePipe,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {
    this.getUserDetails();
   }

  ngOnInit() {
    this.getTaskStatus();
  }
  dismiss() {
    this.modalCtrl.dismiss();
  }
  getTaskStatus(){
    this.authenticationService.getFilterApi().subscribe((res: any) =>{
      if(res){
        this.taskPriorities = res.task_priorities;
        this.taskStatus= res.task_status;
        }
    });
  }
  async getUserDetails(){
    const token = await Storage.get({ key: TOKEN_KEY });
    if (token && token.value) {
      this.token = JSON.parse(token.value);
    }
  }
  formatDate(value: string) {
    this.today = new Date(value);
    this.today.setDate(this.today.getDate());
    this.dateTill = this.today.toISOString().substring(0, 10);
    return format(parseISO(value), 'MMM dd yyyy');
  }
  formatDate2(value: string){
    return format(parseISO(value), 'MMM dd yyyy');
  }

async getFilter(){
  const userData = {
    user_id: this.token.user_id,
    role_id: this.token.role_id,
    start_date: this.datePipe.transform(this.start_date, 'yyyy-MM-dd'),
    end_date:this.datePipe.transform( this.end_date, 'yyyy-MM-dd'),
    selected_priority: this.selectedPriority,
    selected_status: this.selectedStatus
  };
  const loading = await this.loadingController.create();
  await loading.present();
  this.authenticationService.getFilter(userData).subscribe(async (res: any) =>{
    if(res.status === 'FAILED'){
      loading.dismiss();
        const alert = await this.alertController.create({
          header: res.status,
          message: res.message,
          buttons: ['Ok'],
        });
       await alert.present();
    }else {
      loading.dismiss();
      this.filterResult = res;
      this.modalCtrl.dismiss(this.filterResult);
    }
  });
}

}

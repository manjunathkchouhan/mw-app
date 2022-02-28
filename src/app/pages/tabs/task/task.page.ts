/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {
  IonDatetime,
  LoadingController,
  MenuController,
  ModalController,
} from '@ionic/angular';
import { Storage } from '@capacitor/storage';
import {
  Event,
  NavigationEnd,
  Router,
  RoutesRecognized,
} from '@angular/router';
import { Subscription } from 'rxjs';
const TOKEN_KEY = 'my-token';
import { filter, pairwise } from 'rxjs/operators';
import { format, parseISO } from 'date-fns';
import { FilterComponent } from 'src/app/modal/filter/filter.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit, OnDestroy {
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;
  tasksList: any;
  filterTerm: string;
  token;
  url;
  itemSelected = [];
  itemSelected1 = [];
  actualTaskList;
  filter = false;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
  };
  taskStatus;
  dateValue = '';
  dateValue2 = '';
  dateValue3 = '';
  today;
  dateTill;
  start_date;
  end_date;

  private taskListSub: Subscription;

  constructor(
    private authenticationService: AuthenticationService,
    private menu: MenuController,
    private router: Router,
    private loadingController: LoadingController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.taskListSub = this.authenticationService.getTaskData.subscribe(
      (taskData) => {
        this.actualTaskList = taskData;
        this.tasksList = taskData;
      }
    );
    this.getUserDetails();
  }
  async getUserDetails() {
    const token = await Storage.get({ key: TOKEN_KEY });
    if (token && token.value) {
      this.token = JSON.parse(token.value);
      this.getAllTasks();
      this.getTaskStatus();
    }
  }
  formatDate(value: string) {
    return format(parseISO(value), 'MMM dd yyyy');
  }
  formatDate2(value: string) {
    return format(parseISO(value), 'MMM dd yyyy');
  }
  async ionViewWillEnter() {
    const loading = await this.loadingController.create();
    await loading.present();
    const user = {
      role_id: this.token.role_id,
      user_id: this.token.user_id,
    };
    this.authenticationService.getTasks(user).subscribe();
    await loading.dismiss();
  }
  getAllTasks() {
    this.router.events
      .pipe(
        filter((evt: any) => evt instanceof RoutesRecognized),
        pairwise()
      )
      .subscribe(async (events: RoutesRecognized[]) => {
        if (
          events[0].urlAfterRedirects === '/tabs/add-task' ||
          events[1].urlAfterRedirects === '/tabs/add-task'
        ) {
          const loading = await this.loadingController.create();
          await loading.present();
          const user = {
            role_id: this.token.role_id,
            user_id: this.token.user_id,
          };
          this.authenticationService
            .getTasks(user)
            .subscribe(async (res: any) => {
              if (res) {
                await loading.dismiss();
                this.actualTaskList = res;
                this.tasksList = res;
              }
            });
        }
      });
  }
  async openMenu() {
    await this.menu.open();
  }

  onTaskDetails(taskid) {
    this.router.navigate(['/tabs/task-details/' + taskid]);
  }
  ngOnDestroy() {
    if (this.taskListSub) {
      this.taskListSub.unsubscribe();
    }
  }
  public async orderTypeSelected() {
    const loading = await this.loadingController.create();
    await loading.present();
    if (this.itemSelected.length < 1) {
      await loading.dismiss();
      this.tasksList = this.actualTaskList;
    } else {
      await loading.dismiss();
      this.tasksList = this.actualTaskList.filter((d) =>
        this.itemSelected.find((option) => d.task_priority === option)
      );
    }
  }
  public async orderTypeSelected1() {
    const loading = await this.loadingController.create();
    await loading.present();
    if (this.itemSelected1.length < 1) {
      await loading.dismiss();
      this.tasksList = this.actualTaskList;
    } else {
      await loading.dismiss();
      this.tasksList = this.actualTaskList.filter((d) =>
        this.itemSelected1.find((option) => d.task_status === option)
      );
    }
  }
  async filterShow(value) {
    const modal = await this.modalCtrl.create({
      component: FilterComponent,
      componentProps: { taskList: this.actualTaskList },
    });
    modal.onDidDismiss().then(async (dataReturned) => {
      if (dataReturned.data && dataReturned.data.length > 0) {
        this.tasksList = dataReturned.data;
      } else {
        this.tasksList = this.actualTaskList;
      }
    });
    return await modal.present();
  }
  getTaskStatus() {
    const roleId = {
      role_id: this.token.role_id,
    };
    this.authenticationService
      .getTaskStatusForUpdate(roleId)
      .subscribe((res: any) => {
        if (res) {
          this.taskStatus = res;
          this.taskStatus.push({ task_status: 'CREATED' });
        }
      });
  }
  async loadResults() {
    if (!this.start_date || !this.end_date) {
      console.log('Date is missing!');
      return;
    }
    const loading = await this.loadingController.create();
    await loading.present();
    const startDate = new Date(this.start_date);
    const endDate = new Date(this.end_date);
    await loading.dismiss();
    this.tasksList = this.actualTaskList.filter(
      (item) =>
        new Date(item.start_date) >= startDate &&
        new Date(item.end_date) <= endDate
    );
  }
  reset() {
    this.datetime.reset();
  }
  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
      this.tasksList = this.actualTaskList;
    }, 2000);
  }
}

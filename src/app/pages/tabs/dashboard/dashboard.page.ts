/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Device } from '@capacitor/device';
import { App } from '@capacitor/app';
import { FcmService } from 'src/app/services/fcm.service';
const TOKEN_KEY = 'Push registration success token';
const TOKEN_KEY1 = 'my-token';
import { Storage } from '@capacitor/storage';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertController } from '@ionic/angular';
import { App as CapacitorApp } from '@capacitor/app';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  deviceInfo;
  appInfo;
  fcmToken;
  token;
  closeApp;
  dashboardCount;
  constructor(
    private router: Router,
    private fcmService: FcmService,
    private authenticationService: AuthenticationService,
    private alertController: AlertController
  ) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    prefersDark.addListener((mediaQuery) => {
      this.toggleDarkTheme(mediaQuery.matches);
    });
    this.fcmService.initPush();
    this.getDevice();
    this.getAppInfo();
  }

  getDevice = async () => {
    this.deviceInfo = await Device.getInfo();
  };

  getAppInfo = async () => {
    this.appInfo = await App.getInfo();
  };

  ngOnInit() {
    this.loadToken();
  }
  async loadFcmToken() {
    const fcmToken = await Storage.get({ key: TOKEN_KEY });
    if (fcmToken && fcmToken.value) {
      this.fcmToken = JSON.parse(fcmToken.value);
      console.log(this.fcmToken);
      this.checkAppUpdate();
    }
  }
  async loadToken() {
    const token = await Storage.get({ key: TOKEN_KEY1 });
    if (token && token.value) {
      this.token = JSON.parse(token.value);
      this.getDashboard();
      this.loadFcmToken();
    }
  }
  toggleDarkTheme(dark) {
    document.body.classList.toggle('dark', dark);
  }
  toggle(event) {
    const check = event.detail.checked;
    console.log(check);
    this.toggleDarkTheme(check);
  }

  checkAppUpdate() {
    const info = {
      user_id: this.token.user_id,
      os_type: this.deviceInfo.operatingSystem,
      app_version: this.appInfo.version,
      fcm_token: this.fcmToken,
    };
    this.authenticationService
      .checkAppUpdate(info)
      .subscribe(async (res: any) => {
        if (res.status === 'SUCCESS') {
          if (res.data.app_version !== this.appInfo.version) {
            if (res.data.options === 'MANDATORY') {
              const alert = await this.alertController.create({
                header: 'Update!',
                message:
                  'This app needs to be updated mandatorily in order to proceed further.',
                buttons: [
                  {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    id: 'cancel-button',
                    handler: (blah) => {
                      //close app
                      this.getExitApp();
                      // CapacitorApp.addListener('backButton', ({canGoBack}) => {
                      //   if(!canGoBack){
                      //     CapacitorApp.exitApp();
                      //   } else {
                      //     window.history.back();
                      //   }
                      // });
                      console.log('Confirm Cancel: blah');
                    },
                  },
                  {
                    text: 'Okay',
                    id: 'confirm-button',
                    handler: () => {
                      //go to playstore
                      console.log('Confirm Okay');
                    },
                  },
                ],
              });
              await alert.present();
            } else if (res.data.options === 'OPTIONAL') {
              const alert = await this.alertController.create({
                header: 'Update!',
                message: 'This app has some updates that need to be installed.',
                buttons: [
                  {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    id: 'cancel-button',
                    handler: (blah) => {
                      //close alert
                      console.log('Confirm Cancel: blah');
                    },
                  },
                  {
                    text: 'Okay',
                    id: 'confirm-button',
                    handler: () => {
                      //go to playstore
                      console.log('Confirm Okay');
                    },
                  },
                ],
              });
              await alert.present();
            }
          }
        }
      });
  }
  getExitApp = async () => {
    this.closeApp = await App.exitApp();
  };
  ionViewWillEnter() {
    this.getDashboard();
  }
  getDashboard(){
    const user = {
      user_id: this.token.user_id,
      role_id: this.token.role_id
    };
    this.authenticationService.getDashBoardCount(user).subscribe((res: any) =>{
      console.log(res);
      if(res){
        this.dashboardCount = res;
      }
    });
  }
  onTaskComplited(count){
    if(count > 0){
      this.router.navigate(['/tabs/complited-task-list']);
    }
  }
  onPendingTaskList(count){
    if(count > 0){
      this.router.navigate(['/tabs/pending-task-list']);
    }
  }
  onComplitedSubTaskList(count){
    if(count > 0){
      this.router.navigate(['/tabs/complited-subtask-list']);
    }
  }
  onPendingSubTaskList(count){
    if(count > 0){
    this.router.navigate(['/tabs/pending-subtask-list']);
    }
  }
  onTaskChangeRequestList(count){
    if(count > 0){
      this.router.navigate(['/tabs/task-change-request-list']);
    }
  }
  onSubtaskChangeRequestList(count){
    if(count > 0){
      this.router.navigate(['/tabs/subtask-change-request-list']);
    }
  }
}

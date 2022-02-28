import { Injectable } from '@angular/core';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token
} from '@capacitor/push-notifications';
import { Router } from '@angular/router';
const TOKEN_KEY = 'Push registration success token';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor(
    private router: Router,
  ) {
    // this.registerPush();
  }
  initPush() {
      this.registerPush();
  }
  private registerPush() {
  console.log('Initializing HomePage');

    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });


    PushNotifications.addListener('registration', (token: Token) => {
      Storage.set({key: TOKEN_KEY, value: JSON.stringify(token.value)});
      console.log('Push registration success, token: ' + token.value);
      // alert('Push registration success, token: ' + token.value);
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      // alert('Error on registration: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        console.log('Push received: ' + JSON.stringify(notification));
        // alert('Push received: ' + JSON.stringify(notification));
      },
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        console.log(notification.notification.data);
        const data = notification.notification.data;
        console.log('Push action performed: ', JSON.stringify(notification));
        if(data.for === 'TASK'){
          this.router.navigateByUrl('/tabs/task-details/' + data.task_id);
        }else if(data.for === 'SUBTASK'){
          this.router.navigateByUrl('/tabs/sub-task-details/' + data.sub_task_id);
        }
      },
    );
  }
}

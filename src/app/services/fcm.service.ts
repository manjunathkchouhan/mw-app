import { Injectable } from '@angular/core';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token
} from '@capacitor/push-notifications';
import { Router } from '@angular/router';

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
      console.log('Push registration success, token: ' + token.value);
      alert('Push registration success, token: ' + token.value);
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        alert('Push received: ' + JSON.stringify(notification));
      },
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      },
    );
  }
}

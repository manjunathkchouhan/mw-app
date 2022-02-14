import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { FcmService } from './services/fcm.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private fcmService: FcmService
  ) {
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      const showStatusBar = async () => {
        await StatusBar.show();
      };
      this.fcmService.initPush();
      SplashScreen.hide();
    });
    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    this.toggleDarkTheme(prefersDark.matches);

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addListener((mediaQuery) =>
      this.toggleDarkTheme(mediaQuery.matches)
    );

  }
    // Add or remove the "dark" class based on if the media query matches
    toggleDarkTheme(dark) {
      console.log(dark);
      document.body.classList.toggle('dark', true);
    }
}

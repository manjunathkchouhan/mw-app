/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Storage } from '@capacitor/storage';
import { BehaviorSubject } from 'rxjs';
const TOKEN_KEY = 'my-token';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token;
  constructor(
    private authService: AuthenticationService, private router: Router
  ) { }

  ngOnInit() {
    this.getUserDetails();
  }
  async getUserDetails(){
    const token = await Storage.get({ key: TOKEN_KEY });
    if (token && token.value) {
      // console.log('set token: ', token.value);
      this.token = JSON.parse(token.value);
    }
  }

  submitLogout(){
    const userId = {
      user_id: this.token.user_id
    };
    // const loading = await this.loadingController.create();
    // await loading.present();
    this.authService.submitLogout(userId).subscribe(
      async (res) => {
        console.log(res);
        // await loading.dismiss();
        this.router.navigateByUrl('/', { replaceUrl: true });
      }, async (res) => {
        // await loading.dismiss();
        // const alert = await this.alertController.create({
        //   header: 'Login failed',
        //   message: res.error.error,
        //   buttons: ['OK'],
        // });

        // await alert.present();
      }
    );
  }
  // async logout(){
  //   await this.authService.submitLogout();
  //   this.router.navigateByUrl('/', { replaceUrl: true });
  // }

}

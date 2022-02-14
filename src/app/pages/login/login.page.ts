/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Storage } from '@capacitor/storage';
import { Device } from '@capacitor/device';
import { BehaviorSubject } from 'rxjs';
const TOKEN_KEY = 'my-token';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    null
  );
  credentials: FormGroup;
  deviceID;
  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController
  ) {
    this.getDevice();
  }
  getDevice = async () => {
    const info = await Device.getId();
    console.log(info.uuid);
    this.deviceID = info.uuid;
  };

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  async login() {
    const loading = await this.loadingController.create();
    await loading.present();
    const loginData = {
      email: this.credentials.value.email,
      password: this.credentials.value.password,
      device_id: this.deviceID,
    };
    console.log(loginData);
    this.authService.login(loginData).subscribe(async (res: any) => {
      console.log(res);
      if (res.status === 'SUCCESS') {
        await loading.dismiss();
        this.router.navigateByUrl('/tabs', { replaceUrl: true });
      } else if (res.status === 'FAILED') {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Login failed',
          message: res.message,
          buttons: ['OK'],
        });
        await alert.present();
      }
    });
  }
}

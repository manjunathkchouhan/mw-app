import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
})
export class UserModalComponent implements OnInit {
   user: any;
  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }
  dismiss() {
    this.modalCtrl.dismiss();
  }
}

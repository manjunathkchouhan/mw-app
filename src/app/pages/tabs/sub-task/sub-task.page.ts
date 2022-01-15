/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MenuController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';
import { Router } from '@angular/router';
const TOKEN_KEY = 'my-token';

@Component({
  selector: 'app-sub-task',
  templateUrl: './sub-task.page.html',
  styleUrls: ['./sub-task.page.scss'],
})
export class SubTaskPage implements OnInit {
  subTasksList: any;
  filterTerm: string;
  token;
  // query: any;
  // restaurants: any[];

  constructor(
    private authenticationService: AuthenticationService,
    private menu: MenuController,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUserDetails();
  }
  async getUserDetails(){
    const token = await Storage.get({ key: TOKEN_KEY });
    if (token && token.value) {
      // console.log('set token: ', token.value);
      this.token = JSON.parse(token.value);
      this.getAllSubTasks();
    }
  }
  getAllSubTasks(){
    console.log(this.token);
    const user = {
      role_id: this.token.role_id,
      user_id: this.token.user_id
    };
    console.log(user);
    this.authenticationService.getSubTaskList(user).subscribe((res: any) =>{
      console.log(res);
      if(res){
        this.subTasksList = res;
      }
    });
  }
  async openMenu(){
    await console.log('clicking on clik');
    await this.menu.open();
  }
  onSubTaskDetails(subTaskId){
    this.router.navigate(['/tabs/sub-task-details/' + subTaskId]);
  }
  // async onSearchChange(event){
  //   console.log(event.detail.value);
  //   this.query = event.detail.value.toLowerCase();
  //   this.restaurants = [];
  //   if(this.query.length > 0) {
  //     // this.isLoading = true;
  //     setTimeout(async () => {
  //       this.restaurants = this.tasksList.filter((element: any) => element.task_title.includes(this.query));
  //       // console.log(this.restaurants);
  //       // this.isLoading = false;
  //     }, 3000);
  //   }
  // }
}

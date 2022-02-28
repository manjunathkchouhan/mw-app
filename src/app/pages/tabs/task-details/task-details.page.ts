/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit,NgZone } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Storage } from '@capacitor/storage';
import { FormBuilder, FormGroup } from '@angular/forms';
const TOKEN_KEY = 'my-token';
export const FILE_KEY = 'files';
import { AlertController, IonDatetime, LoadingController, NavController } from '@ionic/angular';
import { UserModalComponent } from '../../../modal/user-modal/user-modal.component';
import { ModalController } from '@ionic/angular';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { ApproveComponent } from 'src/app/modal/approve/approve.component';
import { Filesystem, Directory} from '@capacitor/filesystem';
import { HttpClient, HttpEventType } from '@angular/common/http';
// import { File } from '@ionic-native/file/ngx';



@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.page.html',
  styleUrls: ['./task-details.page.scss'],
})
export class TaskDetailsPage implements OnInit {
  singleTask;
  token;
  taskId;
  editTask: FormGroup;
  downloadUrl ='';
  myFiles;
  downloadProgress = 0;
  dataReturned;

  constructor(
    private authService: AuthenticationService,
    private routes: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private modalCtrl: ModalController,
    private fileOpener: FileOpener,
    private loadingController: LoadingController,
    private http: HttpClient
  ) {
    this.taskId = this.activatedRoute.snapshot.paramMap.get('task_id');
    console.log(this.taskId);
    this.loadFiles();
  }

  ngOnInit() {
    this.editTask = this.formBuilder.group({
      task_title: [{value: '', disabled: true}],
      category_id: ['']
    });
    this.getUserDetails();
  }
  async getUserDetails(){
    const token = await Storage.get({ key: TOKEN_KEY });
    if (token && token.value) {
      this.token = JSON.parse(token.value);
    }
  }
  ionViewWillEnter() {
    this.getTaskDetails();
  }
  async getTaskDetails(){
    const loading = await this.loadingController.create();
    await loading.present();
    const task = {
         task_id: this.taskId
     };
     this.authService.getTaskDetails(task).subscribe((res: any)=>{
       console.log(res);
       if(res){
        // this.zone.run(() => {
          loading.dismiss();
         this.singleTask = res;
        // });
       }
     });
   }
   onAddSubTask(){
     this.routes.navigate(['/tabs/add-sub-task/' + this.taskId +'/'+  this.singleTask.end_date]);
   }
   onSubTaskDetails(subTaskId){
    this.routes.navigate(['/tabs/sub-task-details/' + subTaskId]);
   }
   onChangeRequest(){
    this.routes.navigate(['/tabs/change-request/' + this.taskId]);
   }
   onUpdateTask(){
    this.routes.navigate(['/tabs/update-task/' + this.taskId]);
   }
  async onClickUserList(){
    const alert = await this.alertController.create({
      header: 'Users',
      message: this.singleTask.task_users.map(n => n.first_name +''+ n.last_name).join(';'),
      buttons: ['OK']
    });
    await alert.present();
   }
   async openModal() {
    const modal = await this.modalCtrl.create({
      component: UserModalComponent,
      componentProps: {user: this.singleTask.task_users}
    });
    return await modal.present();
  }
  async approveTask(){
    const modal = await this.modalCtrl.create({
      component: ApproveComponent,
      componentProps: {
        task_id: this.taskId,
        user_id: this.token.user_id
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        this.getTaskDetails();
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });

    return await modal.present();
  }
  async loadFiles(){
    const videoList = await Storage.get({key: FILE_KEY});
    this.myFiles = JSON.parse(videoList.value) || [];
  }

  private convertBlobToBase64  = (blob: Blob) => new Promise((resolve, rejects) =>{
    const reader = new FileReader();
    reader.onerror = rejects;
    reader.onload = () =>{
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  private getMimeType(name){
    console.log(name);
    if(name.indexOf('pdf') >= 0){
      return 'application/pdf';
    } else if(name.indexOf('png') >= 0){
      return 'image/png';
    }else if(name.indexOf('mp4') >= 0){
      return 'video/mp4';
    }else if(name.indexOf('jpeg') >= 0){
      return 'image/jpeg';
    }else if(name.indexOf('jpg') >= 0){
      return 'image/jpg';
    }
  }

  downloadFile(url){
    console.log(url);
    this.downloadUrl = url? url: this.downloadUrl;
    this.http.get(this.downloadUrl, {
      responseType: 'blob',
      reportProgress: true,
      observe: 'events'
    }).subscribe(async event =>{
      if(event.type  === HttpEventType.DownloadProgress){
        this.downloadProgress = Math.round((100 * event.loaded)/event.total);
      } else if (event.type  === HttpEventType.Response){
        this.downloadProgress = 0;

        const name = this.downloadUrl.substring(this.downloadUrl.lastIndexOf('/')+1);
        const base64 = await this.convertBlobToBase64(event.body) as string;

       const savedFile =  await Filesystem.writeFile({
          path: name,
          data: base64,
          directory: Directory.Documents,
        });
        // const uriPath= await Filesystem.getUri({
        //   directory: Directory.Documents,
        //   path: name,
        // });
        const path = savedFile.uri;
        console.log(path);
        // const mimeType = this.getMimeType(name);
        // this.fileOpener.open(path, mimeType).then(() =>{
        //   console.log('File is opened');
        // }).catch(error => console.log('Error openings file', error));
        // this.myFiles.unshift(path);
        // Storage.set({
        //   key: FILE_KEY,
        //   value: JSON.stringify(this.myFiles)
        // });
      }
    });
  }

  async createFile(base64: string) {
    console.log(base64);
    try {
      const fileName = base64;
      Filesystem.writeFile({
        path: fileName,
        data: base64,
        directory: Directory.Documents,
        recursive: true
      }).then((res) => {
        console.log('Success create file: ', res);
        Filesystem.getUri({
            directory: Directory.Documents,
            path: fileName
        }).then((getUriResult) => {
            const path = getUriResult.uri;
            this.fileOpener.open(path, 'image/jpg')
            .then(() => console.log('Success open'))
            .catch(error => console.log('Error open File: ', error));
        }, (error) => {
            console.log('error jkjkljlkjlk',error);
        });
      });
    } catch(e) {
     console.error('Error create File: ', e);
    }
  }

  async openFile(f){
    console.log('Open', f);
    const name = f.substring(f.lastIndexOf('/') + 1);
    const mimeType = this.getMimeType(name);
    console.log(mimeType);
    this.fileOpener.open(f, mimeType).then(()=>{
      console.log('File is opened');
    }).catch(e => console.log('Error openings file', e));
  }
  changeRoute(){
    this.routes.navigate(['/tabs/task']);
  }

  // donw(f){
  //   this.http.get(f).subscribe((res) =>{
  //     console.log(res);
  //   });
    // then(res => res.blob()).then(blob => {
    //   console.log('created blob');
    //   this.file.createFile(this.file.dataDirectory, 'temp.pdf', true)
    //   .then(() => {
    //     console.log('file created');
    //     this.file.writeFile(this.file.dataDirectory, 'temp.pdf', blob, { replace: true })
    //     .then(res => {
    //       console.log('file writed');
    //       this.fileOpener.open(res.toInternalURL(), 'image/jpg')
    //       .then((res) => {
    //         console.log('file opened');
    //       }).catch(err => {
    //         console.log('open error');
    //       });
    //     }).catch(err => {
    //       console.log('write error');
    //     });
    //   }).catch(() => {
    //     console.log('create error');
    //   });
    // }).catch(err => {
    //   console.log('blob error');
    // });

  // }

  previewAnyFiles(url){
    window.open(url, '_blank');
  }
  onClick(ChangeRequestId){
    this.routes.navigate(['/tabs/task-change-request-details/' + ChangeRequestId]);
  }
}

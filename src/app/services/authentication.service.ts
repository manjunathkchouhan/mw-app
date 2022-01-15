/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { Storage } from '@capacitor/storage';
const TOKEN_KEY = 'my-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token;
  constructor(private http: HttpClient) {
    this.loadToken();
  }

  async loadToken() {
    const token = await Storage.get({ key: TOKEN_KEY });
    if (token && token.value) {
      console.log('set token: ', token.value);
      this.token = JSON.parse(token.value);
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  login(credentials) {
    console.log(credentials);
    return this.http.post(`http://13.232.183.208/mw_team_app/mobile_app_apis/user_login.php?method=submitLogin`, credentials).pipe(
      map((data: any) => data),
      switchMap(token =>{
        console.log(token);
        return from(Storage.set({key: TOKEN_KEY, value: JSON.stringify(token)}));
      }),
      tap(_ => {
        this.isAuthenticated.next(true);
      })
    );
  }

  //submitLogout
  submitLogout(userId){
    return this.http.post('http://13.232.183.208/mw_team_app/mobile_app_apis/user_login.php?method=submitLogout',userId).pipe
    (map((data: any) => data),
    switchMap(tokenClear =>{
      if(tokenClear.status === 'SUCCESS'){
        return Storage.remove({key: TOKEN_KEY});
      }
    }),
    tap(_ =>{
      this.isAuthenticated.next(false);
    })
    );
  }

  getTasks(user){
    return this.http.post('http://13.232.183.208/mw_team_app/mobile_app_apis/tasks.php?method=getTasksList',user);
  }

  // logout(): Promise<void> {
  //   this.isAuthenticated.next(false);
  //   return Storage.remove({key: TOKEN_KEY});
  // }
  getTaskPriorities(){
    return this.http.get('http://13.232.183.208/mw_team_app/admin_apis/required_data.php?method=getTaskPriorities');
  }
  addTask(taskData){
    return this.http.post('http://13.232.183.208/mw_team_app/admin_apis/tasks.php?method=addNewTask',taskData);
  }
  updateTask(updatedTaskData){
    return this.http.post('http://13.232.183.208/mw_team_app/admin_apis/tasks.php?method=updateTask', updatedTaskData);
  }
  deleteTask(taskId){
    return this.http.post('http://13.232.183.208/mw_team_app/admin_apis/tasks.php?method=updateTask', taskId);
  }
  addSubTask(subTaskData){
    return this.http.post('http://13.232.183.208/mw_team_app/admin_apis/subtasks.php?method=addSubTask',subTaskData);
  }
  updateSubTask(updatedSubTaskData){
    return this.http.post('http://13.232.183.208/mw_team_app/admin_apis/tasks.php?method=updateSubTask', updatedSubTaskData);
  }
  deleteSubTask(subTaskId){
    return this.http.post('http://13.232.183.208/mw_team_app/admin_apis/tasks.php?method=deleteSubTask', subTaskId);
  }
  getUsers(){
    return this.http.get('http://13.232.183.208/mw_team_app/admin_apis/tasks.php?method=getUsersForTask');
  }
  getProjectsTask(){
    return this.http.get('http://13.232.183.208/mw_team_app/admin_apis/tasks.php?method=getProjectsForTask');
  }
  getTaskIntervals(){
    return this.http.get('http://13.232.183.208/mw_team_app/admin_apis/required_data.php?method=getTaskIntervals');
  }
  getAllTasks(loggedUser){
    return this.http.post('http://13.232.183.208/mw_team_app/admin_apis/tasks.php?method=getTasksList', loggedUser);
  }
  getTaskDetails(taskId){
    return this.http.post('http://13.232.183.208/mw_team_app/admin_apis/tasks.php?method=getTaskDetails',taskId);
  }
  getSubTaskList(userData){
    return this.http.post('http://13.232.183.208/mw_team_app/admin_apis/subtasks.php?method=getSubTasksList',userData);
  }
  getUsersForSubTask(){
    return this.http.get('http://13.232.183.208/mw_team_app/admin_apis/subtasks.php?method=getUsersForSubTask');
  }
  getSubTaskDetails(subTaskId){
    return this.http.post('http://13.232.183.208/mw_team_app/mobile_app_apis/subtasks.php?method=getSubTaskDetails',subTaskId);
  }
}

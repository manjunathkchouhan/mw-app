/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, switchMap, take } from 'rxjs/operators';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { Storage } from '@capacitor/storage';
import { ApiConfigService } from '../config/api-config.service';
const TOKEN_KEY = 'my-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  url: string;
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  taskList: BehaviorSubject<any> =  new BehaviorSubject<any>(null);
  subTaskList: BehaviorSubject<any> =  new BehaviorSubject<any>(null);
  token;
  constructor(
    private http: HttpClient,
    private apiConfigService: ApiConfigService
    ) {
    this.url = apiConfigService.api_url;
    this.loadToken();
  }

  get getTaskData(){
    return this.taskList.asObservable();
  }
  get getSubTaskData(){
    return this.subTaskList.asObservable();
  }

  async loadToken() {
    const token = await Storage.get({ key: TOKEN_KEY });
    if (token && token.value) {
      this.token = JSON.parse(token.value);
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  login(credentials) {
    console.log(credentials);
    return this.http.post(`http://13.232.183.208/mw_team_app/mobile_app_apis/user_login.php?method=submitLogin`, credentials)
    .pipe(
      map((data: any) => {
        if(data.status === 'SUCCESS'){
          Storage.set({key: TOKEN_KEY, value: JSON.stringify(data.data)});
        }
        return data;
      }),
      tap(_ => {
        console.log('is authenticated');
        this.isAuthenticated.next(true);
      })
    );
  }

  //submitLogout
  submitLogout(userId){
    return this.http.post(this.url + '/mobile_app_apis/user_login.php?method=submitLogout',userId).pipe
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
    return this.http.post(this.url + '/mobile_app_apis/tasks.php?method=getTasksList',user)
    .pipe(map(resData =>{
      console.log(resData);
      return resData;
    }),
    tap(task =>{
      this.taskList.next(task);
    }),
    );
  }
  getTaskPriorities(){
    return this.http.get(this.url + '/admin_apis/required_data.php?method=getTaskPriorities');
  }
  addTask(taskData){
    // let tasks;
    return this.http.post(this.url + '/admin_apis/tasks.php?method=addNewTask',taskData);
    // .pipe(switchMap(resData =>{
    //   console.log(resData);
    //   tasks =  resData;
    //   return this.getTaskData;
    // }),
    // take(1),
    // tap(task =>{
    //   console.log(task);
    //   // const newTask = tasks.data;
    //   this.taskList.next(task.concat(tasks.data));
    //   return tasks;
    // }),
    // );
  }
  updateTask(updatedTaskData){
    return this.http.post(this.url + '/mobile_app_apis/tasks.php?method=updateTaskStatus', updatedTaskData);
  }
  deleteTask(taskId){
    return this.http.post(this.url + '/admin_apis/tasks.php?method=updateTask', taskId);
  }
  addSubTask(subTaskData){
    return this.http.post(this.url + '/admin_apis/subtasks.php?method=addSubTask',subTaskData);
  }
  updateSubTask(updatedSubTaskData){
    return this.http.post(this.url + '/mobile_app_apis/subtasks.php?method=updateSubTaskStatus', updatedSubTaskData);
  }
  deleteSubTask(subTaskId){
    return this.http.post(this.url + '/admin_apis/tasks.php?method=deleteSubTask', subTaskId);
  }
  getUsers(){
    return this.http.get(this.url + '/admin_apis/tasks.php?method=getUsersForTask');
  }
  getProjectsTask(){
    return this.http.get(this.url + '/admin_apis/tasks.php?method=getProjectsForTask');
  }
  getTaskIntervals(){
    return this.http.get(this.url + '/admin_apis/required_data.php?method=getTaskIntervals');
  }
  getAllTasks(loggedUser){
    return this.http.post(this.url + '/mobile_app_apis/tasks.php?method=getTasksList', loggedUser);
  }
  getTaskDetails(taskId){
    return this.http.post(this.url + '/mobile_app_apis/tasks.php?method=getTaskDetails',taskId);
  }
  getSubTaskList(userData){
    return this.http.post(this.url + '/mobile_app_apis/subtasks.php?method=getSubTasksList',userData);
    // .pipe(map(resData =>{
    //   console.log(resData);
    //   return resData;
    // }),
    // tap(task =>{
    //   this.subTaskList.next(task);
    // }),
    // );
  }
  getUsersForSubTask(){
    return this.http.get(this.url + '/admin_apis/subtasks.php?method=getUsersForSubTask');
  }
  getSubTaskDetails(subTaskId){
    return this.http.post(this.url + '/mobile_app_apis/subtasks.php?method=getSubTaskDetails',subTaskId);
  }
 getTaskStatusForUpdate(roleId){
  return this.http.post(this.url + '/admin_apis/required_data.php?method=getTaskStatusForUpdate',roleId);
 }
 taskChangeRequest(changeRequestData){
  return this.http.post(this.url + '/mobile_app_apis/tasks.php?method=requestForChangeInTask',changeRequestData);
 }
 subTaskChangeRequest(ChangeRequestData){
  return this.http.post(this.url + '/mobile_app_apis/subtasks.php?method=requestForChangeInSubTask', ChangeRequestData);
 }
 getUserListForChangeRequest(taskId){
  return this.http.post(this.url + '/admin_apis/required_data.php?method=getUsersInTask', taskId);
 }
 getUserListSubTaskChangeRequest(subTaskId){
  return this.http.post(this.url + '/admin_apis/required_data.php?method=getUsersInSubTask', subTaskId);
 }
 approveTask(approveData){
   console.log(approveData);
   return this.http.post(this.url + '/mobile_app_apis/tasks.php?method=approveCompletedTask', approveData);
 }
 //getTaskStatusAndPrioritiesForFilter
 getFilterApi(){
  return this.http.get(this.url + '/admin_apis/required_data.php?method=getTaskStatusAndPrioritiesForFilter');
 }
 getFilter(userData){
  return this.http.post(this.url + '/mobile_app_apis/tasks.php?method=getFilteredTaskList', userData);
 }
 getSubtaskFilter(userData){
  return this.http.post(this.url + '/mobile_app_apis/subtasks.php?method=getFilteredSubTaskList', userData);
 }
 checkAppUpdate(appInfo){
   return this.http.post(this.url + '/mobile_app_apis/user_login.php?method=getAppUpdateDetails',appInfo);
 }
 getDashBoardCount(userDetails){
  return this.http.post(this.url + '/admin_apis/dashboard_data.php?method=getDashboardCounts',userDetails);
 }
 getComplitedTaskList(userDetails){
  return this.http.post(this.url + '/admin_apis/tasks.php?method=getCompletedTaskList',userDetails);
 }
 getPendingTaskList(userDetails){
  return this.http.post(this.url + '/admin_apis/tasks.php?method=getPendingTaskList',userDetails);
 }
 getComplitedSubTaskList(userDetails){
  return this.http.post(this.url + '/admin_apis/subtasks.php?method=getCompletedSubTasksList',userDetails);
 }
 getPendingSubTaskList(userDetails){
  return this.http.post(this.url + '/admin_apis/subtasks.php?method=getPendingSubTasksList',userDetails);
 }
 getTaskChangeRequestList(userDetails){
  return this.http.post(this.url + '/admin_apis/tasks.php?method=getChangeRequestListForTask',userDetails);
 }
 getSubtaskChangeRequestList(userDetails){
  return this.http.post(this.url + '/admin_apis/subtasks.php?method=getChangeRequestListForSubTask',userDetails);
 }
 getChangeRequestDetails(userDetails){
  return this.http.post(this.url + '/admin_apis/tasks.php?method=getChangeRequestDetailsForTask',userDetails);
 }
 cancelTaskChangeRequest(requestChange){
  return this.http.post(this.url + '/admin_apis/tasks.php?method=cancelChangeRequestForTask',requestChange);
 }
 processTaskChangeRequest(requestChangeData){
  return this.http.post(this.url + '/admin_apis/tasks.php?method=processChangeRequestForTask',requestChangeData);
 }
 getChangeRequestDetailsForSubTask(userDetails){
  return this.http.post(this.url + '/admin_apis/subtasks.php?method=getChangeRequestDetailsForSubTask',userDetails);
 }
 cancelChangeRequestForSubTask(requestChange){
  return this.http.post(this.url + '/admin_apis/subtasks.php?method=cancelChangeRequestForSubTask',requestChange);
 }
 processChangeRequestForSubTask(requestChangeData){
  return this.http.post(this.url + '/admin_apis/subtasks.php?method=processChangeRequestForSubTask',requestChangeData);
 }

}

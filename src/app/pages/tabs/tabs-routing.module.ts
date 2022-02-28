/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
      },
      {
        path: 'task',
        loadChildren: () => import('./task/task.module').then( m => m.TaskPageModule)
      },
      {
        path: 'sub-task',
        loadChildren: () => import('./sub-task/sub-task.module').then( m => m.SubTaskPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'add-task',
    loadChildren: () => import('./add-task/add-task.module').then( m => m.AddTaskPageModule)
  },
  {
    path: 'task-details/:task_id',
    loadChildren: () => import('./task-details/task-details.module').then( m => m.TaskDetailsPageModule)
  },
  {
    path: 'add-sub-task/:task_id/:task_endDate',
    loadChildren: () => import('./add-sub-task/add-sub-task.module').then( m => m.AddSubTaskPageModule)
  },
  {
    path: 'sub-task-details/:sub_task_id',
    loadChildren: () => import('./sub-task-details/sub-task-details.module').then( m => m.SubTaskDetailsPageModule)
  },
  {
    path: 'change-request/:task_id',
    loadChildren: () => import('./change-request/change-request.module').then( m => m.ChangeRequestPageModule)
  },
  {
    path: 'update-task/:task_id',
    loadChildren: () => import('./update-task/update-task.module').then( m => m.UpdateTaskPageModule)
  },
  {
    path: 'update-sub-task/:sub_task_id',
    loadChildren: () => import('./update-sub-task/update-sub-task.module').then( m => m.UpdateSubTaskPageModule)
  },
  {
    path: 'subtask-change-request/:sub_task_id',
    loadChildren: () => import('./subtask-change-request/subtask-change-request.module').then( m => m.SubtaskChangeRequestPageModule)
  },
  {
    path: 'complited-task-list',
    loadChildren: () => import('./complited-task-list/complited-task-list.module').then( m => m.ComplitedTaskListPageModule)
  },
  {
    path: 'pending-task-list',
    loadChildren: () => import('./pending-task-list/pending-task-list.module').then( m => m.PendingTaskListPageModule)
  },
  {
    path: 'complited-subtask-list',
    loadChildren: () => import('./complited-subtask-list/complited-subtask-list.module').then( m => m.ComplitedSubtaskListPageModule)
  },
  {
    path: 'pending-subtask-list',
    loadChildren: () => import('./pending-subtask-list/pending-subtask-list.module').then( m => m.PendingSubtaskListPageModule)
  },
  {
    path: 'task-change-request-list',
    loadChildren: () => import('./task-change-request-list/task-change-request-list.module').then( m => m.TaskChangeRequestListPageModule)
  },
  {
    path: 'subtask-change-request-list',
    loadChildren: () => import('./subtask-change-request-list/subtask-change-request-list.module').then( m => m.SubtaskChangeRequestListPageModule)
  },
  {
    path: 'task-change-request-details/:task_change_request_id',
    loadChildren: () => import('./task-change-request-details/task-change-request-details.module').then( m => m.TaskChangeRequestDetailsPageModule)
  },
  {
    path: 'subtask-change-request-details/:subtask_change_request_id',
    loadChildren: () => import('./subtask-change-request-details/subtask-change-request-details.module').then( m => m.SubtaskChangeRequestDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}

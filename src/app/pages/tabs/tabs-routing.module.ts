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
    path: 'add-sub-task/:task_id',
    loadChildren: () => import('./add-sub-task/add-sub-task.module').then( m => m.AddSubTaskPageModule)
  },
  {
    path: 'sub-task-details/:sub_task_id',
    loadChildren: () => import('./sub-task-details/sub-task-details.module').then( m => m.SubTaskDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}

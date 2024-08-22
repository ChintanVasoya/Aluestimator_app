import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'createwindow',
    loadChildren: () => import('./form/window/window.module').then(m => m.WindowPageModule)
  },
  {
    path: 'createproject',
    loadChildren: () => import('./form/project/project.module').then(m => m.ProjectPageModule)
  },
  {
    path: 'door',
    loadChildren: () => import('./form/door/door.module').then(m => m.DoorPageModule)
  },
  {
    path: 'partition',
    loadChildren: () => import('./form/partition/partition.module').then(m => m.PartitionPageModule)
  },
  {
    path: 'projects/:ProjectId',
    loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

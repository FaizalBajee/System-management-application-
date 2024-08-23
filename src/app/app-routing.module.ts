import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login-screen',
    pathMatch: 'full'
  },
  {
    path: 'master',
    loadChildren: () => import('./pages/master/master.module').then( m => m.MasterPageModule)
  },
  {
    path: 'login-screen',
    loadChildren: () => import('./pages/login-screen/login-screen.module').then( m => m.LoginScreenPageModule)
  },
  {
    path: 'report',
    loadChildren: () => import('./pages/report/report.module').then( m => m.ReportPageModule)
  },
  {
    path: 'main-page',
    loadChildren: () => import('./pages/main-page/main-page.module').then( m => m.MainPagePageModule)
  },
  {
    path: 'master-type',
    loadChildren: () => import('./pages/master-type/master-type.module').then( m => m.MasterTypePageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

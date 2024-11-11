import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserGuard } from 'src/app/guards/addUserGuard.gaurd';
import { MasterTypePage } from './master-type.page';

const routes: Routes = [
  {
    path: '',
    component: MasterTypePage,
    canActivate: [AddUserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterTypePageRoutingModule { }

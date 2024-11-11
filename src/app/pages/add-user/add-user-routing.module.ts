import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserGuard } from 'src/app/guards/addUserGuard.gaurd';
import { AddUserPage } from './add-user.page';

const routes: Routes = [
  {
    path: '',
    component: AddUserPage,
    canActivate: [AddUserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddUserPageRoutingModule { }

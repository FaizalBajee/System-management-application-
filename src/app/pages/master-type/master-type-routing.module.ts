import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MasterTypePage } from './master-type.page';

const routes: Routes = [
  {
    path: '',
    component: MasterTypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterTypePageRoutingModule {}

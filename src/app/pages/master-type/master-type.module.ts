import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MasterTypePageRoutingModule } from './master-type-routing.module';

import { MasterTypePage } from './master-type.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MasterTypePageRoutingModule
  ],
  declarations: [MasterTypePage]
})
export class MasterTypePageModule {}

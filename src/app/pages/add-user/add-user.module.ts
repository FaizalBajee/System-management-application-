import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AddUserPageRoutingModule } from './add-user-routing.module';

import { AddUserPage } from './add-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddUserPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddUserPage]
})
export class AddUserPageModule {}

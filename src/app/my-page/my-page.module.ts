import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyPageRoutingModule } from './my-page-routing.module';
import { MyPageComponent } from './my-page.component';
import { MyTestsComponent } from './my-tests/my-tests.component';
import { EditMyAccountComponent } from './edit-my-account/edit-my-account.component';


@NgModule({
  declarations: [MyPageComponent, MyTestsComponent, EditMyAccountComponent],
  imports: [
    CommonModule,
    MyPageRoutingModule
  ]
})
export class MyPageModule { }

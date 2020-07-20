import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedComponentsModule} from '../shared/shared-components/shared-components.module';
import {AccountService} from './edit-my-account/account.service';
import {FormsModule} from '@angular/forms';

import { MyPageRoutingModule } from './my-page-routing.module';
import { MyPageComponent } from './my-page.component';
import { MyTestsComponent } from './my-tests/my-tests.component';
import { EditMyAccountComponent } from './edit-my-account/edit-my-account.component';
import { SingleComponent } from './my-tests/single/single.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import {PaginationComponent} from '../pagination/pagination.component';
import { AllTestsComponent } from './all-tests/all-tests.component';


@NgModule({
  declarations: [
    MyPageComponent,
    MyTestsComponent,
    EditMyAccountComponent,
    SingleComponent,
    SideBarComponent,
    AllTestsComponent],
  imports: [
    FormsModule,
    SharedComponentsModule,
    CommonModule,
    MyPageRoutingModule
  ],
  providers: [
    AccountService
  ]
})
export class MyPageModule { }

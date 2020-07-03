import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyPageComponent } from './my-page.component';
import {MyTestsComponent} from './my-tests/my-tests.component';
import {EditMyAccountComponent} from './edit-my-account/edit-my-account.component';

const routes: Routes = [
  { path: '', component: MyPageComponent },
  { path: 'my-test', component: MyTestsComponent },
  { path: 'edit-my-account', component: EditMyAccountComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyPageRoutingModule { }

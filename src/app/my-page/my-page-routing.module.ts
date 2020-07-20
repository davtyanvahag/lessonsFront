import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyPageComponent } from './my-page.component';
import {MyTestsComponent} from './my-tests/my-tests.component';
import {EditMyAccountComponent} from './edit-my-account/edit-my-account.component';
import {SingleComponent} from './my-tests/single/single.component';

const routes: Routes = [
  { path: '', component: MyPageComponent,
    children: [
      { path: 'my-tests', component: MyTestsComponent},
      { path: 'my-tests/single/:id', component: SingleComponent},
      { path: 'edit-my-account', component: EditMyAccountComponent }
    ]},
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyPageRoutingModule { }

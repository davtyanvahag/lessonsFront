import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigngleTestComponent } from './signgle-test.component';

const routes: Routes = [{ path: '', component: SigngleTestComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SigngleTestRoutingModule { }

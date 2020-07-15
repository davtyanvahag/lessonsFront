import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigngleNewsComponent } from './signgle-news.component';

const routes: Routes = [{ path: '', component: SigngleNewsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SigngleNewsRoutingModule { }

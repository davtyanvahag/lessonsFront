import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestsComponent } from './tests.component';
import {SingleComponent} from './single/single.component';

const routes: Routes = [
  { path: '', component: TestsComponent },
  { path: '/single/:id', component: SingleComponent }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestsRoutingModule { }

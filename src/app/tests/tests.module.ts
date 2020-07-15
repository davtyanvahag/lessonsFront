import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestsRoutingModule } from './tests-routing.module';
import { TestsComponent } from './tests.component';
import { SingleComponent } from './single/single.component';


@NgModule({
  declarations: [TestsComponent, SingleComponent],
  imports: [
    CommonModule,
    TestsRoutingModule
  ]
})
export class TestsModule { }

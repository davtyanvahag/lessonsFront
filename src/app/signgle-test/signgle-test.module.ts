import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SigngleTestRoutingModule } from './signgle-test-routing.module';
import { SigngleTestComponent } from './signgle-test.component';
import {SingleTestService} from './single-test.service';
import {SharedComponentsModule} from '../shared/shared-components/shared-components.module';


@NgModule({
  declarations: [SigngleTestComponent],
  imports: [
    SharedComponentsModule,
    CommonModule,
    SigngleTestRoutingModule
  ],
  providers: [
    SingleTestService
  ]
})
export class SigngleTestModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundRoutingModule } from './not-found-routing.module';
import { NotFoundComponent } from './not-found.component';
import {SharedComponentsModule} from '../shared/shared-components/shared-components.module';


@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    SharedComponentsModule,
    CommonModule,
    NotFoundRoutingModule
  ]
})
export class NotFoundModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SigngleNewsRoutingModule } from './signgle-news-routing.module';
import { SigngleNewsComponent } from './signgle-news.component';
import {SharedComponentsModule} from '../shared/shared-components/shared-components.module';
import {SingleNewsService} from './single-news.service';


@NgModule({
  declarations: [
    SigngleNewsComponent,
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    SigngleNewsRoutingModule
  ],
  providers: [
    SingleNewsService
  ]
})
export class SigngleNewsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import {SharedComponentsModule} from '../shared/shared-components/shared-components.module';
import {SharedService} from '../shared/shared.service';


@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    AboutRoutingModule,
    SharedComponentsModule
  ],
  providers: [SharedService]
})
export class AboutModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LessonsRoutingModule } from './lessons-routing.module';
import { LessonsComponent } from './lessons.component';
import {SharedComponentsModule} from '../shared/shared-components/shared-components.module';
import {SharedService} from '../shared/shared.service';


@NgModule({
  declarations: [LessonsComponent],
  imports: [
    CommonModule,
    LessonsRoutingModule,
    SharedComponentsModule
  ],
  providers: [SharedService]
})
export class LessonsModule { }

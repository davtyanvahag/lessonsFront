import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RulesRoutingModule } from './rules-routing.module';
import { RulesComponent } from './rules.component';
import {SharedComponentsModule} from '../shared/shared-components/shared-components.module';
import {SharedService} from '../shared/shared.service';


@NgModule({
  declarations: [RulesComponent],
  imports: [
    CommonModule,
    RulesRoutingModule,
    SharedComponentsModule
  ],
  providers: [SharedService]
})
export class RulesModule { }

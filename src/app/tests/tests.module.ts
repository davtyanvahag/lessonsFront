import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedComponentsModule} from '../shared/shared-components/shared-components.module';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule} from '@angular/forms';
import { NgSelectConfig } from '@ng-select/ng-select';
import { ɵs } from '@ng-select/ng-select';

import { TestsRoutingModule } from './tests-routing.module';
import { TestsComponent } from './tests.component';
import { SingleComponent } from './single/single.component';
import {LoaderComponent} from '../loader/loader.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {LoaderInterceptorService} from '../loader/loader-interceptor.service';


@NgModule({
  declarations: [TestsComponent, SingleComponent, LoaderComponent],
  imports: [
    CommonModule,
    SharedComponentsModule,
    FormsModule,
    NgSelectModule,
    TestsRoutingModule
  ],
  providers: [
    NgSelectConfig,
    ɵs,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true
    }
  ],
  exports: [LoaderInterceptorService]
})
export class TestsModule { }

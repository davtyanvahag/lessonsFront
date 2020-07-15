import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignUpRoutingModule } from './sign-up-routing.module';
import { SignUpComponent } from './sign-up.component';
import {SignUpService} from './sign-up.service';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [SignUpComponent],
  imports: [
    CommonModule,
    SignUpRoutingModule,
    FormsModule
  ],
  providers: [SignUpService]
})
export class SignUpModule { }

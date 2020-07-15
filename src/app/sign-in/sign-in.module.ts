import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInComponent } from './sign-in.component';
import {FormsModule} from '@angular/forms';
import {SignInService} from './sign-in.service';


@NgModule({
  declarations: [SignInComponent],
  imports: [
    FormsModule,
    CommonModule,
    SignInRoutingModule
  ],
  providers: [SignInService]
})
export class SignInModule { }

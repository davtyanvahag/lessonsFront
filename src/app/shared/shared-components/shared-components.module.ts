import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from '../../header/header.component';
import {FooterComponent} from '../../footer/footer.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {PaginationComponent} from '../../pagination/pagination.component';



@NgModule({
  imports: [ CommonModule, RouterModule, FormsModule],
  declarations: [
    HeaderComponent,
    PaginationComponent,
    FooterComponent
  ],
  exports:      [
    HeaderComponent,
    PaginationComponent,
    FooterComponent,
    CommonModule
  ]
})
export class SharedComponentsModule { }

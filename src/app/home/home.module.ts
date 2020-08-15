import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { CarouselModule } from 'ngx-owl-carousel-o';
import { NguCarouselModule } from '@ngu/carousel';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SliderComponent } from './slider/slider.component';
import { NewsComponent } from './news/news.component';
import { TestsComponent } from './tests/tests.component';
import {TestsService} from './tests/tests.service';
import {SliderService} from './slider/slider.service';
import {NewsService} from './news/news.service';
import {SharedComponentsModule} from '../shared/shared-components/shared-components.module';
import { AboutComponent } from './about/about.component';


@NgModule({
  declarations: [
    HomeComponent,
    SliderComponent,
    NewsComponent,
    TestsComponent,
    AboutComponent],
  imports: [
    CommonModule,
    // CarouselModule,
    NguCarouselModule,
    SharedComponentsModule,
    HomeRoutingModule
  ],
  providers: [
    TestsService,
    SliderService,
    NewsService
  ]
})
export class HomeModule { }

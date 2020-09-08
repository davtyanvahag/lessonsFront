import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {NewsService} from '../news/news.service';
import { NguCarousel, NguCarouselConfig, NguCarouselStore  } from '@ngu/carousel';
import {environment} from '../../../environments/environment';
import {SliderService} from './slider.service';
// import {OwlOptions} from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit, AfterViewInit {
  sliders: any;
  backendUrl: string;
  carouselConfig: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
    load: 3,
    interval: {timing: 5000, initialDelay: 2000},
    loop: true,
    touch: true,
    velocity: 0.2,
    point: {
      visible: true,
      hideOnSingleSlide: true
    }
  };
  slideNo = 0;
  withAnim = true;
  @ViewChild('myCarousel', {static: true}) myCarousel;
  constructor(private sliderService: SliderService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.backendUrl = environment.apiUrl;
    this.getNews();
  }

  moveTo(slide) {
    this.myCarousel.moveTo(slide, !this.withAnim);
  }

  ngAfterViewInit() {
    this.getNews();
  }

  getNews() {
    this.sliderService.get().subscribe( (res: any) => {
      if (!res.error) {
        this.sliders = res.data;
      }
    });
  }

}

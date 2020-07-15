import { Component, OnInit } from '@angular/core';
import {NewsService} from '../news/news.service';
import {environment} from '../../../environments/environment';
import {SliderService} from './slider.service';
import {OwlOptions} from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  sliders: any;
  backendUrl: string;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['Previous', 'Next'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  };

  constructor(private sliderService: SliderService) { }

  ngOnInit() {
    this.backendUrl = environment.apiUrl;
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

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SingleNewsService} from './single-news.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-signgle-news',
  templateUrl: './signgle-news.component.html',
  styleUrls: ['./signgle-news.component.css']
})
export class SigngleNewsComponent implements OnInit {
  newsId: string;
  singleNews: any;
  backendUrl: string;

  constructor(private route: ActivatedRoute,
              private singleNewsService: SingleNewsService) { }

  ngOnInit() {
    this.backendUrl = environment.apiUrl;
    this.route.params.subscribe((param) => {
      this.newsId = param.id;
      console.log(param.id);
      this.singleNewsService.getSingleNews(param.id).subscribe( (res: any) => {
        if (!res.error) {
          this.singleNews = res.data;
        }
      });
    });
  }

}

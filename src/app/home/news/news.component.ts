import { Component, OnInit } from '@angular/core';
import {NewsService} from './news.service';
import {environment} from '../../../environments/environment';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  limit: number;
  page: number;
  total: number;
  news: any;
  backendUrl: string;

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.backendUrl = environment.apiUrl;
    this.page = 1;
    this.limit = 6;
    this.getNews();
  }

  getNews() {
    this.newsService.getNews(this.page, this.limit).subscribe( (res: any) => {
      if (!res.error) {
        this.news = res.data;
        this.total = res.total;
      }
    });
  }

  currentpage(n: number): void {
    this.page = n;
    this.getNews();
  }

  next(): void {
    this.page++;
    this.getNews();
  }

  prev(): void {
    this.page--;
    this.getNews();
  }

}

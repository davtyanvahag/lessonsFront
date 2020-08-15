import { Component, OnInit } from '@angular/core';
import {TestsService} from './tests.service';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {
  limit: number;
  page: number;
  total: number;
  tests: any;

  constructor(private testsService: TestsService) { }

  ngOnInit() {
    this.page = 1;
    this.limit = 6;
    this.getTests();
  }

  getTests() {
    this.testsService.getTests(this.page, this.limit).subscribe( (res: any) => {
      if (!res.error) {
        this.tests = res.data;
        this.total = res.total;
      }
    });
  }

  currentpage(n: number): void {
    this.page = n;
    this.getTests();
  }

  next(): void {
    this.page++;
    this.getTests();
  }

  prev(): void {
    this.page--;
    this.getTests();
  }

}

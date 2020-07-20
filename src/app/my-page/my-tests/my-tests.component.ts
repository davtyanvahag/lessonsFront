import { Component, OnInit } from '@angular/core';
import {MyTestsService} from './my-tests.service';
import {SharedService} from '../../shared/shared.service';

@Component({
  selector: 'app-my-tests',
  templateUrl: './my-tests.component.html',
  styleUrls: ['./my-tests.component.css']
})
export class MyTestsComponent implements OnInit {

  page: number;
  limit: number;
  total: number;
  orders: any;
  constructor(private myTestsService: MyTestsService,
              private sharedService: SharedService) {
    this.sharedService.hasSideBarStatus(true);
  }

  ngOnInit() {
    this.page = 1;
    this.limit = 6;
    this.getMyTests();
  }

  getMyTests() {
    this.myTestsService.getUserOrders(this.page, this.limit).subscribe( (res: any) => {
      if ( !res.error) {
        this.orders = res.data;
        this.total = res.total;
      }
    });
  }

  currentpage(n: number): void {
    this.page = n;
    this.getMyTests();
  }

  next(): void {
    this.page++;
    this.getMyTests();
  }

  prev(): void {
    this.page--;
    this.getMyTests();
  }

}

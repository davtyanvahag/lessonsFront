import { Component, OnInit } from '@angular/core';
import {MyTestsService} from './my-tests.service';
import {SharedService} from '../../shared/shared.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-my-tests',
  templateUrl: './my-tests.component.html',
  styleUrls: ['./my-tests.component.css']
})
export class MyTestsComponent implements OnInit {
  activeIndex: number;
  backendUrl: string;
  page: number;
  limit: number;
  total: number;
  modalShowHide: boolean;
  orders: any;
  test: any;
  constructor(private myTestsService: MyTestsService,
              private sharedService: SharedService) {
    this.sharedService.hasSideBarStatus(true);
  }

  ngOnInit() {
    this.backendUrl = environment.apiUrl;
    this.activeIndex = 0;
    this.modalShowHide = false;
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

  getCurrentOrder(id) {
    this.myTestsService.getOneForUserAnswered(id).subscribe( (res: any) => {
      if (!res.error) {
        this.test = res.data;
        console.log(this.test);
        this.modalShowHide = true;

      }
    });
  }

  getTrueOrFalse(id) {
    const index = this.test.questions.findIndex(el =>  el.q_id === id);
    return this.test.questions[index].user_answer_index === this.test.questions[index].answer_index;
  }

  getPoint(id) {
    const index = this.test.questions.findIndex(el =>  el.q_id === id);
    return this.test.questions[index].point;
  }

  getIndex(id) {
    const index = this.test.questions.findIndex(el =>  el.q_id === id);
    return this.test.questions[index].user_answer_index;
  }

  getCorrectAnswerIndex(id) {
    const index = this.test.questions.findIndex(el =>  el.q_id === id);
    return this.test.questions[index].answer_index;
  }

}

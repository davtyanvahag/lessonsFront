import { Component, OnInit } from '@angular/core';
import {MyTestsService} from './my-tests.service';
import {SharedService} from '../../shared/shared.service';
import {environment} from '../../../environments/environment';
import {AccountService} from '../edit-my-account/account.service';

@Component({
  selector: 'app-my-tests',
  templateUrl: './my-tests.component.html',
  styleUrls: ['./my-tests.component.css']
})
export class MyTestsComponent implements OnInit {
  activeIndex: number;
  backendUrl: string;
  orderId: string;
  deleteMessage: string;
  cats: any;
  page: number;
  limit: number;
  total: number;
  allAnswersSum: number;
  correctAnswersSum: number;
  answersSumPerc: number;
  wrongAnswersSum: number;
  noAnswersSum: number;
  modalShowHide: boolean;
  modalShowHide1: boolean;
  deleteOrderModal: boolean;
  orders: any;
  noAnswer: any;
  correctAnswer: any;
  user: any;
  wrongAnswer: any;
  test: any;
  constructor(private myTestsService: MyTestsService,
              private accountService: AccountService,
              private sharedService: SharedService) {
    this.sharedService.hasSideBarStatus(true);
  }

  ngOnInit() {
    this.deleteMessage = 'Վստահե՞ք, որ ուզում եք ջնջել!!!';
    this.allAnswersSum = 0;
    this.correctAnswersSum = 0;
    this.answersSumPerc = 0;
    this.wrongAnswersSum = 0;
    this.noAnswersSum = 0;
    this.noAnswer = [];
    this.correctAnswer = [];
    this.wrongAnswer = [];
    this.backendUrl = environment.apiUrl;
    this.activeIndex = 0;
    this.modalShowHide = false;
    this.deleteOrderModal = false;
    this.modalShowHide1 = false;
    this.page = 1;
    this.limit = 6;
    this.getMyTests();
    this.accountService.getCurrenUser().subscribe( (res: any) => {
      if (!res.error) {
        this.user = res.user;
      }
    });
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

  deleteOrder() {
    this.myTestsService.delete(this.orderId).subscribe((res: any) => {
      if (!res.error) {
        this.deleteMessage = 'Ջնջված է';

        setTimeout(() => { this.getMyTests(); this.deleteOrderModal = false; }, 1500);
      } else {
        this.deleteMessage = 'Առկա են խնդիրներ, խնդրում ենք կապնվել օպերատորի հետ';
      }
    });
  }

  getCurrentOrder(id) {
    this.myTestsService.getOneForUserAnswered(id).subscribe( (res: any) => {
      if (!res.error) {
        this.noAnswer = [0];
        this.correctAnswer = [0];
        this.wrongAnswer = [0];
        this.correctAnswersSum = 0;
        this.wrongAnswersSum = 0;
        this.noAnswersSum = 0;
        this.test = res.data;
        console.log(this.test);
        this.modalShowHide = true;

      }
    });
  }
  getCurrentOrder1(id) {
    this.myTestsService.getOneForUserAnswered(id).subscribe( (res: any) => {
      if (!res.error) {
        this.noAnswer = [0];
        this.correctAnswer = [0];
        this.wrongAnswer = [0];
        this.correctAnswersSum = 0;
        this.wrongAnswersSum = 0;
        this.noAnswersSum = 0;
        this.test = res.data;
        this.cats = this.groupBy(this.test.questionsList, 'category_id');
        Object.keys(this.cats);
        this.modalShowHide1 = true;
      }
    });
  }

  groupBy(xs, key) {
    return xs.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
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

  getPerc(data) {
    return Math.ceil((data.user_total_point_answers * 100) / data.total_point_questons);
  }


  getCatName(id) {
    return this.test.categories.filter(el => {
      return el._id === id;
    })[0].name;
  }
  getCorrectAnswerSum() {
    return this.correctAnswer.reduce((a, b) => a + b);
  }

  getCorrectAnswer(obj, i) {
    this.correctAnswer[i] = 0;
    obj.forEach((el1) => {
      this.test.questions.forEach(el2 => {
        if (el2.q_id === el1._id) {
          if (el2.user_answer_index === el2.answer_index) {
            this.correctAnswer[i] += 1;
            this.correctAnswersSum += this.correctAnswer[i];
          }
        }
      });
    });
    return this.correctAnswer;
  }

  getWrongAnswerSum() {
    return this.wrongAnswer.reduce((a, b) => a + b);
  }
  getWrongAnswer(obj, i) {
    this.wrongAnswer[i] = 0;
    obj.forEach((el1) => {
      this.test.questions.forEach(el2 => {
        if (el2.q_id === el1._id) {
          if (el2.user_answer_index !== el2.answer_index && el2.user_answer_index !== -1) {
            this.wrongAnswer[i] += 1;
            this.wrongAnswersSum += this.wrongAnswer[i] ;
          }
        }
      });
    });
    return this.wrongAnswer;
  }

  getNoAnswerSum() {
    return this.noAnswer.reduce((a, b) => a + b);
  }
  getNoAnswer(obj, i) {
    this.noAnswer[i] = 0;
    obj.forEach((el1) => {
      this.test.questions.forEach(el2 => {
        if (el2.q_id === el1._id) {
          if (el2.user_answer_index === -1) {
            this.noAnswer[i] += 1;
            this.noAnswersSum += this.noAnswer[i] ;
          }
        }
      });
    });
    return this.noAnswer;
  }

}

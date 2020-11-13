import { Component, OnInit } from '@angular/core';
import {MyTestsService} from '../my-tests.service';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {SharedService} from '../../../shared/shared.service';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent implements OnInit {

  test: any;
  answerd: any;
  answersCkecked: any;
  interval;
  testId: any;
  activeIndex: number;
  timeMinutes: number;
  timeSeconds: number;
  backendUrl: string;
  start: boolean;
  modalShowHide: boolean;
  modalShowHide1: boolean;
  constructor(private myTestsService: MyTestsService,
              private activatedRoute: ActivatedRoute,
              private sharedService: SharedService,
              private router: Router) {
    this.sharedService.hasSideBarStatus(false);
  }

  ngOnInit() {
    this.backendUrl = environment.apiUrl;
    this.answersCkecked = [];
    this.start = false;
    this.modalShowHide = false;
    this.modalShowHide1 = false;
    this.activeIndex = 0;
    this.activatedRoute.params.subscribe(param => {
      if (param.id) {
        this.testId = param.id;
        this.getTest();
      } else {
        this.router.navigate(['/my-page/my-tests']);
      }
    });
  }

  getTest() {
    this.answerd = [];
    this.myTestsService.getUserSingleOrder(this.testId).subscribe( (res: any) => {
      if (!res.error) {
        this.test = res.data;
        this.test.questionsList.forEach( (el, i) => {
          this.answersCkecked.push([]);
          this.answerd.push(false);
          el.answers.forEach((e, j) => {
            this.answersCkecked[i].push({bool: false});
          });
        });
        console.log(this.test);
      } else {
        this.router.navigate(['/my-page/my-tests']);
      }
    });
  }

  setTimer() {
    this.timeMinutes = Math.floor(this.test.testsList.timer / 60);
    this.timeSeconds =  Math.floor(this.test.testsList.timer % 60);
    this.interval = setInterval(() => {
      if (this.timeSeconds > 0) {
        this.timeSeconds--;
      } else {
        if (this.timeMinutes > 0) {
          this.timeSeconds = 60;
          this.timeMinutes--;
        } else {
          clearInterval(this.interval);
          this.modalShowHide1 = true;
          setTimeout(() => {
            this.modalShowHide1 = false;
            this.endTest();
          }, 2000);
        }
      }
    }, 1000);
  }

  getStarted() {
    this.start = true;
    this.setTimer();
  }

  endTest() {
    clearInterval(this.interval);
    this.test.participated_timer =  this.test.testsList.timer - ((this.timeMinutes * 60) + this.timeSeconds);
    console.log(this.test);
    this.myTestsService.answerUpdate(this.test).subscribe( (res: any) => {
      if (!res.error) {
        this.router.navigate(['/my-page/my-tests']);
      }
    });
  }

  answer(ind, answerIndex, id) {
    // console.log(index, answerIndex, this.answersCkecked);
    const index = this.test.questions.findIndex(el => el.q_id === id);

    // this.test.questions[index].user_answer_index = answerIndex;
    if (this.test.questions[index].user_answer_index === answerIndex) {
      this.test.questions[index].user_answer_index = -1;
      this.answerd[ind] = false;
    } else {
      this.test.questions[index].user_answer_index = answerIndex;
      this.answerd[ind] = true;
    }
    // for (let i = 0; i < this.answersCkecked.length; i++) {
      for (let j = 0; j < this.answersCkecked[ind].length; j++) {
        if ( answerIndex === j)  {
          if (this.answersCkecked[ind][j].bool) {
            this.answersCkecked[ind][j].bool = false;
          } else {
            this.answersCkecked[ind][j].bool = true;
          }
        } else {
          this.answersCkecked[ind][j].bool = false;
        }
      }
    // }

  }



}

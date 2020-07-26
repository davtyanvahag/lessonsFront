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
        this.test.questionsList.forEach( el => {
          this.answerd.push(false);
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
          setTimeout(function() {
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

  answer(index, answerIndex) {
    this.test.questions[index].user_answer_index = answerIndex;
    this.answerd[index] = true;
  }



}

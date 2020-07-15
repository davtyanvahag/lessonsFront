import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SingleTestService} from './single-test.service';

@Component({
  selector: 'app-signgle-test',
  templateUrl: './signgle-test.component.html',
  styleUrls: ['./signgle-test.component.css']
})
export class SigngleTestComponent implements OnInit {

  testId: string;
  singleTest: any;

  constructor(private route: ActivatedRoute,
              private singleTestService: SingleTestService) { }

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.testId = param.id;
      console.log(param.id);
      this.singleTestService.getOneFront(param.id).subscribe( (res: any) => {
        if (!res.error) {
          this.singleTest = res.data;
        }
      });
    });
  }

}

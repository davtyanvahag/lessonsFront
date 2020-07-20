import { Component, OnInit } from '@angular/core';
import {TestsService} from '../tests.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent implements OnInit {
  test: any;
  constructor(private testsService: TestsService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(param => {
      if (param.id) {
        this.testsService.getOne(param.id).subscribe((res: any) => {
          if (!res.error) {
            this.test = res.data;
          } else {
            this.test = null;
          }
        });
      } else {
        this.test = null;
      }
    });
  }



}
